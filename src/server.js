import express from 'express'
import { loadConfig } from './config.js'
import { logger, httpLogger } from './logger.js'
import * as database from './database.js'
import { Worker } from 'node:worker_threads'
import routes from './routes.js'
import { fileURLToPath } from 'url'
import 'source-map-support/register.js'

export const server = configPath => {
  return new Promise((resolve, reject) => {
    const config = loadConfig(configPath)
    logger.info(`environment: ${config['environment']}`)

    const db = database.connect(config.database)

    const app = express()
    const port = config.port || 3000
    let worker = null

    app.use(httpLogger)
    app.use(express.json()) // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })) // Parse form data

    routes.setup(config.environment, app, db)

    const serverInstance = app.listen(port, () => {
      console.log(`🔥 Stack listening on port ${port}`)
      console.log(`📍 Health check: http://localhost:${port}/health`)

      if (config.worker) {
        worker = new Worker('./dist/worker.js')
      }

      resolve(serverInstance)
    })

    serverInstance.on('error', reject)

    const shutdown = async () => {
      serverInstance.close()
      await db.close?.()
      if (worker) await worker.terminate()
      process.exit(0)
    }

    serverInstance.shutdown = shutdown
    ;['SIGTERM', 'SIGINT'].forEach(sig => process.on(sig, shutdown))
  })
}

const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] === __filename) {
  const configPath = process.argv[2] || './app.yaml'
  server(configPath)
}
