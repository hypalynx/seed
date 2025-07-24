import { spawn } from 'node:child_process';
import path from 'node:path';
import { context } from 'esbuild';

const workspace = process.cwd();

// Server build config
const serverConfig = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  logLevel: 'info',
  sourcemap: true,
  entryPoints: {
    server: path.join(workspace, 'src', 'server.js')
  },
  outdir: path.join(workspace, 'dist'),
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
};

// Client build config
const clientConfig = {
  bundle: true,
  platform: 'browser',
  format: 'esm',
  logLevel: 'info',
  sourcemap: true,
  entryPoints: {
    client: path.join(workspace, 'src', 'client.jsx')
  },
  outdir: path.join(workspace, 'dist', 'static'),
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
};

let cssProcess = null;
let serverProcess = null;

const startServer = () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  
  console.log('🚀 Starting server...');
  serverProcess = spawn('node', ['dist/server.js'], {
    stdio: 'inherit',
    cwd: workspace
  });
};

const startCSSWatch = () => {
  console.log('🎨 Watching CSS files...');
  cssProcess = spawn('npx', [
    'tailwindcss',
    '-i', './src/styles.css',
    '-o', './dist/static/styles.css',
    '--watch'
  ], {
    stdio: 'inherit',
    cwd: workspace
  });
};

async function dev() {
  console.log('🏗️  Starting development server...');
  
  startCSSWatch();

  // Build client in watch mode
  const clientContext = await context(clientConfig);
  await clientContext.watch();
  console.log('👀 Watching client files...');
  
  // Build server in watch mode
  const serverContext = await context({
    ...serverConfig,
    plugins: [{
      name: 'rebuild-notify',
      setup(build) {
        build.onEnd(result => {
          if (result.errors.length > 0) {
            console.error('❌ Server build failed:', result.errors);
          } else {
            console.log('✅ Server rebuilt');
            startServer();
          }
        });
      }
    }]
  });
  await serverContext.watch();
  
  // Initial server start
  startServer();
  
  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    if (serverProcess) serverProcess.kill();
    if (cssProcess) cssProcess.kill();
    clientContext.dispose();
    serverContext.dispose();
    process.exit(0);
  });
}

dev().catch(console.error);
