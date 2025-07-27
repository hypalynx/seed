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

const app = express()
const port = config.port || 3000
const workspace = process.cwd()

app.use('/assets', express.static(path.join(workspace, 'dist', 'assets')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
})

// SSR for all other routes
app.get('*', (req, res) => {
  try {
    const appHtml = render(h(Router, { ssrPath: req.path }, h(App)))
    res.send(createHTML(appHtml, { assetBase: '/assets' }))
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`🔥 Stack listening on port ${port}`)
  console.log(`📍 Health check: http://localhost:${port}/health`)
})
