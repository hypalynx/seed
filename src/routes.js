import express from 'express'
import path from 'node:path'
import { watch } from 'node:fs'
import { loadConfig, loadAssetManifest } from './config.js'
import { render } from 'preact-render-to-string'
import { h } from 'preact'
import { App } from './App.jsx'
import { Router } from 'wouter-preact'
import { createHTML } from './page.js'
import * as database from './database.js'
import { logger } from './logger.js'

export const setup = (environment, app, db) => {
  const cwd = process.cwd()
  const manifestPath = './dist/assets-manifest.json'

  assets(app, cwd)
  monitoring(app)
  environment === 'development' && hotReload(app, manifestPath)
  ssr(app, environment, manifestPath)
}

const assets = (app, cwd) => {
  app.use(
    '/assets',
    express.static(path.join(cwd, 'dist', 'assets'), {
      maxAge: '1y', // 1 year cache since filenames change when content changes
      immutable: true,
    }),
  )
}

const monitoring = app => {
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    })
  })
}

const hotReload = (app, manifestPath) => {
  let manifest = loadAssetManifest(manifestPath)
  const clients = new Set()
  let currentManifest = null

  try {
    const watcher = watch(manifestPath, eventType => {
      if (eventType === 'change') {
        try {
          manifest = loadAssetManifest(manifestPath)

          if (JSON.stringify(currentManifest) !== JSON.stringify(manifest)) {
            logger.info('Asset manifest changed, notifying clients')

            const clientsArray = Array.from(clients)

            for (const client of clientsArray) {
              try {
                client.write('event: hot-reload\n')
                client.write(`data: ${JSON.stringify(manifest)}\n\n`)
              } catch (e) {
                logger.info('communication failed with browser client: ' + e)
                clients.delete(client)
              }
            }
            currentManifest = manifest
          }
        } catch (error) {
          logger.error('Error processing manifest change:', error)
        }
      }
    })

    process.on('SIGTERM', () => watcher.close())
    process.on('SIGINT', () => watcher.close())
  } catch (error) {
    logger.error('Failed to set up file watcher:', error)
  }

  app.get('/dev/events', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })

    clients.add(res)
    res.write('retry: 1000\n')
    res.write('event: connected\n\n')
    res.write('event: hot-reload\n')
    res.write(`data: ${JSON.stringify(manifest)}\n\n`)

    req.on('close', () => {
      clients.delete(res)
    })
  })
}

const api = (app, db) => {
  const apiRouter = express.Router()

  apiRouter.get('/products/random', async (req, res) => {
    const { limit } = req.query
    let parsedLimit = limit ? parseInt(limit) : 4
    parsedLimit = Math.min(Math.max(parsedLimit, 1), 16)

    res.json(database.productsByRandom(db, parsedLimit))
  })
}

const ssr = (app, environment, manifestPath) => {
  let manifest = loadAssetManifest(manifestPath)

  app.get('*', (req, res) => {
    try {
      if (environment === 'development') {
        manifest = loadAssetManifest(manifestPath) // keep checking for new assets in dev
      }
      const appHtml = render(h(Router, { ssrPath: req.path }, h(App)))
      // Short cache for HTML since it contains asset references
      res.set('Cache-Control', 'public, max-age=300') // 5 minutes
      res.send(createHTML(appHtml, { assetBase: '/assets', manifest }))
    } catch (error) {
      console.error('SSR Error:', error)
      res.status(500).send('Internal Server Error')
    }
  })
}

export default { setup }
