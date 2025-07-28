import express from 'express'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { render } from 'preact-render-to-string'
import { h } from 'preact'
import { App } from './App.jsx'
import { parse } from 'yaml'
import { Router } from 'wouter-preact'
import { createHTML } from './page'

const config = parse(readFileSync('./app.yaml', 'utf8')) // TODO handle if missing?
console.log(`environment: ${config['environment']}`)

function loadAssetManifest() {
  try {
    return JSON.parse(readFileSync('./dist/assets-manifest.json', 'utf8'))
  } catch (error) {
    console.warn('⚠️  No asset manifest found, using original filenames')
    return {}
  }
}

let assets = loadAssetManifest()
console.log('📦 Loaded asset manifest:', assets)

const app = express()
const port = config.port || 3000
const workspace = process.cwd()

app.use(
  '/assets',
  express.static(path.join(workspace, 'dist', 'assets'), {
    maxAge: '1y', // 1 year cache since filenames change when content changes
    immutable: true,
  }),
)

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
})

app.get('*', (req, res) => {
  try {
    if (config.environment === 'development') {
      assets = loadAssetManifest() // keep checking for new assets in dev
    }
    const appHtml = render(h(Router, { ssrPath: req.path }, h(App)))
    // Short cache for HTML since it contains asset references
    res.set('Cache-Control', 'public, max-age=300') // 5 minutes
    res.send(createHTML(appHtml, { assetBase: '/assets', assets }))
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`🔥 Stack listening on port ${port}`)
  console.log(`📍 Health check: http://localhost:${port}/health`)
})
