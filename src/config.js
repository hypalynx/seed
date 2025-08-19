import { parse } from 'yaml'
import { readFileSync, statSync } from 'node:fs'
import * as z from 'zod'

// Cache the manifest with file watching
let manifestCache = null
let lastModified = 0
let lastPath = null

export function loadAssetManifest(jsonPath) {
  try {
    const stats = statSync(jsonPath)

    // Only reload if file changed or different path
    if (
      manifestCache &&
      stats.mtimeMs <= lastModified &&
      jsonPath === lastPath
    ) {
      return manifestCache
    }

    manifestCache = JSON.parse(readFileSync(jsonPath, 'utf8'))
    lastModified = stats.mtimeMs
    lastPath = jsonPath
    return manifestCache
  } catch {
    console.warn('⚠️  No asset manifest found, using original filenames')
    return manifestCache || {}
  }
}

const ConfigSchema = z
  .object({
    environment: z.string(),
    port: z.number().int(),
    database: z.string().min(1),
  })
  .strict()

export function loadConfig(yamlPath) {
  const config = parse(readFileSync(yamlPath, 'utf8'))
  const result = ConfigSchema.safeParse(config)
  if (!result.error) {
    return config
  } else {
    console.warn(`⚠️ config has issues: ${result.error}`)
    return {}
  }
}
