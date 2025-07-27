import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { createHTML } from '../src/page.js'
import { rm, mkdir, cp } from 'node:fs/promises'
import { context, build, analyzeMetafile } from 'esbuild'
import path from 'node:path'
// TODO structured logging for the app would be nice. both server/client

await rm('dist', { recursive: true, force: true }) // clean before proceeding
await mkdir('dist', { recursive: true })

let serverProcess = null
const isWatch = process.argv.includes('--watch')
const isDetail = process.argv.includes('--detail')
const isClientOnly = process.argv.includes('--client-only')

const baseConfig = {
  bundle: true,
  format: 'esm',
  sourcemap: !isWatch,
  metafile: isDetail,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
}

const createConfig = overrides => ({ ...baseConfig, ...overrides })

const configs = {
  server: createConfig({
    platform: 'node',
    // packages: 'bundle', // 'external' leaves deps alone, expects npm i.
    packages: 'external',
    entryPoints: { server: 'src/server.js' },
    outdir: 'dist',
  }),
  client: createConfig({
    platform: 'browser',
    entryPoints: {
      client: 'src/client.jsx',
      styles: 'src/styles/styles.css',
    },
    outdir: 'dist/assets',
  }),
}

async function main() {
  await copyAssets()
  await generateStaticHTML()
  isWatch ? dev() : buildApp()
}

async function buildApp() {
  console.log(`🚧 Building app (mode: ${isClientOnly ? 'client' : 'full'})`)

  const builds = [build(configs.client)]
  !isClientOnly && builds.push(build(configs.server))

  const results = await Promise.all(builds)

  if (isDetail) {
    results.forEach(async result => {
      console.log(await analyzeMetafile(result.metafile, { verbose: true }))
    })
  }
}

async function dev() {
  const clientContext = await context(configs.client)
  await clientContext.watch()

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

  startServer()
}

async function copyAssets() {
  await cp('src/assets', 'dist/assets', { recursive: true })
  console.log('📄 Assets copied')
}

async function generateStaticHTML() {
  const html = createHTML('')
  await writeFile('dist/index.html', html)
  console.log('📄 Static HTML generated')
}

function startServer() {
  serverProcess?.kill()
  serverProcess = spawn('node', ['dist/server.js'], { stdio: 'inherit' })
}

main()
