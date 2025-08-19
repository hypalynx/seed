import pino from 'pino'
import pinoHTTP from 'pino-http'

const setup = () => {
  const config = {
    name: 'stack',
    level: 'info',
    formatters: {
      level: label => ({ level: label }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers["set-cookie"]',
        '*.password',
        '*.token',
      ],
      censor: '[REDACTED]',
    },
  }

  return pino(config)
}

export const logger = setup()

export const appLogger = logger.child({ module: 'app' })

export const httpLogger = pinoHTTP({
  logger: logger,
  customLogLevel: res => {
    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn'
    if (res.statusCode >= 500) return 'error'
    return 'info'
  },
  serializers: {
    req: req => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      remoteAddress: req.remoteAddress,
      userAgent: req.headers['user-agent']?.split(' ')[0], // Just first part
      host: req.headers.host,
    }),
    res: res => ({
      statusCode: res.statusCode,
      contentType: res.headers['content-type'],
    }),
  },
  autoLogging: {
    ignore: req => {
      const ignored_paths = [
        '/health',
        '/assets-manifest.json',
        '/favicon.ico',
        '/assets/', // All asset requests
        '/dev/events', // Hot reload SSE
      ]
      return ignored_paths.some(p => req.url.includes(p))
    },
  },
})
