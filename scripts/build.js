import { spawn } from 'node:child_process';
import { context, build, analyzeMetafile } from 'esbuild';
import { cp } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';

const workspace = process.cwd();
const watchMode = process.argv.includes('--watch');
const detailMode = process.argv.includes('--detail');

const serverConfig = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  logLevel: 'info',
  metafile: true,
  sourcemap: true,
  entryPoints: {
    server: path.join(workspace, 'src', 'server.js')
  },
  outdir: path.join(workspace, 'dist'),
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
};

const clientConfig = {
  bundle: true,
  platform: 'browser',
  format: 'esm',
  logLevel: 'info',
  metafile: true,
  sourcemap: true,
  entryPoints: {
    client: path.join(workspace, 'src', 'client.jsx')
  },
  outdir: path.join(workspace, 'dist', 'static'),
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
};

async function copyStatic() {
  try {
    await cp(
      path.join(workspace, 'src', 'static'), 
      path.join(workspace, 'dist', 'static'), 
      { recursive: true }
    );
    console.log('📄 Static files copied');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

async function buildAll() {
  console.log('🏗️  Building for production...');
  
  try {
    const [serverResult, clientResult] = await Promise.all([
      build(serverConfig),
      build(clientConfig),
      copyStatic()
    ]);
    
    if (detailMode && serverResult.metafile) {
      console.log('🏗️  Server Bundle Analysis');
      const serverAnalysis = await analyzeMetafile(
        serverResult.metafile,
        { verbose: true }
      );
      console.log(serverAnalysis);
    }
    
    if (detailMode && clientResult.metafile) {
      console.log('🏗️  Client Bundle Analysis');
      const clientAnalysis = await analyzeMetafile(
        clientResult.metafile,
        { verbose: true }
      );
      console.log(clientAnalysis);
    }
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

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

async function dev() {
  console.log('🏗️  Starting development server...');
  
  // Make sure assets are available initially
  await copyStatic();
  
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
  
  // Watch static files - fixed to watch the correct directory
  const staticPath = path.join(workspace, 'src', 'static');
  let staticWatcher;
  
  try {
    staticWatcher = watch(staticPath, { recursive: true }, (eventType, filename) => {
      console.log(`📄 Static file changed: ${filename}, copying...`);
      copyStatic();
    });
    console.log('👀 Watching static files...');
  } catch (error) {
    console.log('⚠️  Static folder not found, skipping static file watching');
  }
  
  // Initial server start
  startServer();
  
  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    if (serverProcess) serverProcess.kill();
    if (staticWatcher) staticWatcher.close();
    clientContext.dispose();
    serverContext.dispose();
    process.exit(0);
  });
}

watchMode ? dev().catch(console.error) : buildAll();
