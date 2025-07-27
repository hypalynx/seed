import { spawn } from 'node:child_process'
import { context, build, analyzeMetafile } from 'esbuild'
import { cp } from 'node:fs/promises'
import { watch } from 'node:fs'
import path from 'node:path'

const workspace = process.cwd()
const isWatch = process.argv.includes('--watch')
const isDetail = process.argv.includes('--detail')
const isClientOnly = process.argv.includes('--client-only')

const baseConfig = {
  bundle: true,
  format: 'esm',
  logLevel: 'info',
  sourcemap: isWatch,
  metafile: isDetail,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
}

const createConfig = overrides => ({ ...baseConfig, ...overrides })

const configs = {
  server: createConfig({
    platform: 'node',
    packages: 'external',
    entryPoints: { server: 'src/server.js' },
    outdir: 'dist',
  }),
  client: createConfig({
    platform: 'browser',
    minify: !isWatch,
    define: { WATCH: `${isWatch}` },
    entryPoints: {
      client: 'src/client.jsx',
      styles: 'src/styles/styles.css',
    },
    outdir: 'dist/assets',
  }),
}

async function copyAssets() {
  try {
    await cp('src/assets', 'dist/assets', { recursive: true })
    console.log('📄 Assets copied')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

async function buildAll() {
  const mode = isClientOnly ? 'client-only' : 'full'
  console.log(`🏗️  Building for production (${mode})...`)

  try {
    const builds = [build(configs.client), copyAssets()]
    if (!isClientOnly) builds.push(build(configs.server))

    const results = await Promise.all(builds)
    const [clientResult, , serverResult] = results

    if (isDetail) {
      const toAnalyze = isClientOnly
        ? [['Client', clientResult]]
        : [
            ['Server', serverResult],
            ['Client', clientResult],
          ]

      for (const [name, result] of toAnalyze) {
        if (result?.metafile) {
          console.log(`🏗️  ${name} Bundle Analysis`)
          console.log(await analyzeMetafile(result.metafile, { verbose: true }))
        }
      }
    }

    console.log('✅ Build completed successfully!')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

let serverProcess = null

function startServer() {
  serverProcess?.kill()
  console.log('🚀 Starting server...')
  serverProcess = spawn('node', ['dist/server.js'], { stdio: 'inherit' })
}

async function dev() {
  console.log('🏗️  Starting development server...')
  await copyAssets()

  // Start esbuild dev server for static assets with live reload
  const clientContext = await context({
    ...configs.client,
    banner: {
      js: 'new EventSource("/esbuild").addEventListener("change", () => location.reload());',
    },
  })

  const { host, port } = await clientContext.serve({
    servedir: 'dist/assets',
    port: 3001,
  })
  console.log(`📦 Static assets served at http://${host}:${port}`)

  // Watch server with restart plugin
  const serverContext = await context({
    ...configs.server,
    plugins: [
      {
        name: 'restart-server',
        setup: build =>
          build.onEnd(result => {
            if (result.errors.length === 0) {
              console.log('✅ Server rebuilt')
              startServer()
            }
          }),
      },
    ],
  })
  await serverContext.watch()

  // Watch assets
  let assetsWatcher
  try {
    assetsWatcher = watch('src/assets', { recursive: true }, () => copyAssets())
    console.log('👀 Watching assets...')
  } catch {
    console.log('⚠️  No assets folder found')
  }

  startServer()

  // Cleanup
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...')
    serverProcess?.kill()
    assetsWatcher?.close()
    clientContext.dispose()
    serverContext.dispose()
    process.exit(0)
  })
}

async function clientOnlyDev() {
  console.log('🏗️  Starting client-only dev server...')
  await copyAssets()

  // Start esbuild dev server with live reload for CSS
  const clientContext = await context({
    ...configs.client,
    banner: {
      js: 'new EventSource("/esbuild").addEventListener("change", () => location.reload());',
    },
  })

  const { host, port } = await clientContext.serve({
    servedir: 'dist/assets',
    port: 3000,
  })
  console.log(`🚀 Dev server running at http://${host}:${port}`)

  // Watch assets
  let assetsWatcher
  try {
    assetsWatcher = watch('src/assets', { recursive: true }, () => copyAssets())
    console.log('👀 Watching assets...')
  } catch {
    console.log('⚠️  No assets folder found')
  }

  // Cleanup
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...')
    assetsWatcher?.close()
    clientContext.dispose()
    process.exit(0)
  })
}

// Run
if (isWatch) {
  ;(isClientOnly ? clientOnlyDev() : dev()).catch(console.error)
} else {
  buildAll()
}
