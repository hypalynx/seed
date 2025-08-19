import { spawn } from 'node:child_process'
import { rm, mkdir, cp, writeFile } from 'node:fs/promises'
import * as esbuild from 'esbuild'
import { createHTML } from '../src/page.js'

const watching = process.argv.includes('--watch')
let serverProcess

const baseConfig = {
  bundle: true,
  format: 'esm',
  metafile: true,
  sourcemap: true,
  jsx: 'automatic',
  jsxImportSource: 'preact',
}

const configs = {
  server: {
    ...baseConfig,
    platform: 'node',
    packages: 'external',
    entryPoints: { server: 'src/server.js', worker: 'src/worker.js' },
    outdir: 'dist',
  },
  client: {
    ...baseConfig,
    platform: 'browser',
    entryPoints: { client: 'src/client.jsx', styles: 'src/styles/styles.css' },
    entryNames: '[name].[hash]',
    loader: {
      '.woff': 'file',
      '.woff2': 'file',
      '.ttf': 'file',
      '.otf': 'file',
      '.eot': 'file',
    },
    outdir: 'dist/assets',
  },
}

const buildAssets = async result => {
  await cp('src/assets', 'dist/assets', { force: true, recursive: true })
  await cp('src/sql', 'dist/sql', { force: true, recursive: true })

  const manifest = {}
  for (const [path, info] of Object.entries(result.metafile.outputs)) {
    if (info.entryPoint) {
      const name = info.entryPoint
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
      manifest[name] = path.replace('dist/assets/', '')
    }
  }
  await writeFile(
    'dist/assets-manifest.json',
    JSON.stringify(manifest, null, 2),
  )
  await writeFile('dist/index.html', createHTML('', { manifest }))
  return manifest
}

// Clean + setup
await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })

if (watching) {
  // Watch mode
  const serverCtx = await esbuild.context(configs.server)
  const clientCtx = await esbuild.context({
    ...configs.client,
    plugins: [
      {
        name: 'manifest',
        setup: build =>
          build.onEnd(async result => {
            if (result.errors.length === 0) await buildAssets(result)
          }),
      },
    ],
  })

  await Promise.all([serverCtx.watch(), clientCtx.watch()])
  await buildAssets(await clientCtx.rebuild()) // Initial generation

  serverProcess = spawn('node', ['--watch', 'dist/server.js'], {
    stdio: 'inherit',
  })
  process.on('SIGINT', () => (serverProcess?.kill(), process.exit()))
} else {
  // Build mode
  const [, clientResult] = await Promise.all([
    esbuild.build(configs.server),
    esbuild.build(configs.client),
  ])
  await buildAssets(clientResult)
}
