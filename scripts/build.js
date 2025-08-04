import { spawn } from 'node:child_process'
import { writeFile, rm, mkdir, cp } from 'node:fs/promises'
import { context, build, analyzeMetafile } from 'esbuild'
import { createHTML } from '../src/page.js'

await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })

let serverProcess = null
const isWatch = process.argv.includes('--watch')
const isDetail = process.argv.includes('--detail')
const isClientOnly = process.argv.includes('--client-only')

const baseConfig = {
  bundle: true,
  format: 'esm',
  sourcemap: !isWatch,
  metafile: true,
  jsx: 'automatic',
  jsxImportSource: 'preact',
}

const configs = {
  server: {
    ...baseConfig,
    platform: 'node',
    packages: 'external',
    entryPoints: { server: 'src/server.js' },
    outdir: 'dist',
  },
  client: {
    ...baseConfig,
    platform: 'browser',
    entryPoints: {
      client: 'src/client.jsx',
      styles: 'src/styles/styles.css',
    },
    entryNames: '[name].[hash]',
    loader: {
      '.woff': 'file',
      '.woff2': 'file',
      '.ttf': 'file',
      '.otf': 'file',
      '.eot': 'file',
    },
    define: {
      'process.env.RELOAD': isWatch ? 'true' : 'false',
    },
    outdir: 'dist/assets',
  },
}

async function main() {
  await copyAssets()
  isWatch ? dev() : buildApp()
}

function extractAssetNames(metafile) {
  const assets = {}
  for (const [outputPath, info] of Object.entries(metafile.outputs)) {
    if (info.entryPoint) {
      const originalName = info.entryPoint
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
      assets[originalName] = outputPath.replace('dist/assets/', '')
    }
  }
  return assets
}

async function generateManifestAndHTML(assets) {
  await writeFile('dist/assets-manifest.json', JSON.stringify(assets, null, 2))
  await writeFile('dist/index.html', createHTML('', { assets }))
  console.log('📦 Manifest and HTML generated:', assets)
}

async function copyAssets() {
  await cp('src/assets', 'dist/assets', { recursive: true })
  console.log('📄 Assets copied')
}

async function buildApp() {
  console.log(`🚧 Building app (mode: ${isClientOnly ? 'client' : 'full'})`)

  const clientResult = await build(configs.client)
  const assets = extractAssetNames(clientResult.metafile)
  await generateManifestAndHTML(assets)

  const results = [clientResult]
  if (!isClientOnly) {
    results.push(await build(configs.server))
  }

  if (isDetail) {
    results.forEach(async result => {
      console.log(await analyzeMetafile(result.metafile, { verbose: true }))
    })
  }
}

async function dev() {
  const clientContext = await context({
    ...configs.client,
    plugins: [
      {
        name: 'update-manifest',
        setup: build =>
          build.onEnd(async result => {
            if (result.errors.length === 0) {
              const assets = extractAssetNames(result.metafile)
              await generateManifestAndHTML(assets)
              console.log('✅ Client rebuilt')
            }
          }),
      },
    ],
  })

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

  await Promise.all([clientContext.watch(), serverContext.watch()])
  startServer()
}

function startServer() {
  serverProcess?.kill()
  serverProcess = spawn('node', ['dist/server.js'], { stdio: 'inherit' })
}

main()
