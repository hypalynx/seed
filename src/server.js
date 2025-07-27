import express from 'express'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { render } from 'preact-render-to-string'
import { h } from 'preact'
import { App } from './App.jsx'
import { parse } from 'yaml'
import { Router } from 'wouter-preact'

const config = parse(readFileSync('./app.yaml', 'utf8')) // TODO handle if missing?
console.log(config['environment'])

const isDevelopment = config.environment === 'development'

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
    // Render the app server-side
    const appHtml = render(h(Router, { ssrPath: req.path }, h(App)))

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stack</title>
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  <div id="app" class="min-h-screen">${appHtml}</div>
  <script type="module" src="/assets/client.js"></script>
</body>
</html>`

    res.send(html)
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`🔥 Stack listening on port ${port}`)
  console.log(`📍 Health check: http://localhost:${port}/health`)
})
