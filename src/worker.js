import { logger } from './logger.js'

export const workerLogger = logger.child({ module: 'worker' })

const run = async () => {
  workerLogger.info('I have nothing to do, give me expensive tasks to perform')
}

run()
