import { build } from 'esbuild';
import path from 'node:path';

const workspace = process.cwd();

const serverConfig = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  logLevel: 'info',
  minify: true,
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
  minify: true,
  entryPoints: {
    client: path.join(workspace, 'src', 'client.jsx')
  },
  outdir: path.join(workspace, 'dist', 'static'),
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
};

const buildCSS = () => {
  return new Promise((resolve, reject) => {
    const cssProcess = spawn('npx', [
      'tailwindcss',
      '-i', './src/styles.css',
      '-o', './dist/static/styles.css',
      '--minify'
    ], { stdio: 'inherit' });
    
    cssProcess.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`CSS build failed with code ${code}`));
    });
  });
};

async function buildAll() {
  console.log('🏗️  Building for production...');
  
  try {
    await Promise.all([
      build(serverConfig),
      build(clientConfig),
      buildCSS()
    ]);
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildAll();
