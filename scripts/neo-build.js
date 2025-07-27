// args
// client only
// + optional server
// dev
// build
// index.html needs to be static for both options to work!
// structured logging for the app would be nice. both server/client

const isWatch = process.argv.includes('--watch')
const isDetail = process.argv.includes('--detail')
const isClientOnly = process.argv.includes('--client-only')

const jsBaseConfig = {
  bundle: true,
  format: 'esm',
  sourcemap: !isWatch,
  metafile: isDetail,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
}

const createConfig = overrides => ({ ...baseConfig, ...overrides })

const jsConfig = {
  server: createConfig({
    platform: 'node',
    packages: 'bundle', // 'external' leaves deps alone, expects npm i.
  }),
  client: createConfig({
    platform: 'browser',
  }),
}

async function copyAssets() {
  await cp('src/assets', 'dist/assets', { recursive: true })
  console.log('📄 Assets copied')
}
