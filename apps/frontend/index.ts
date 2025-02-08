import * as path from 'node:path';
import type { ViteDevServer } from 'vite';

let devServer: ViteDevServer | null = null;
const SERVER_DIR = path.join(__dirname, 'build/server/index.js');
const PUBLIC_DIR = path.join(__dirname, 'build/client');

export function getPublicDir() {
  return PUBLIC_DIR;
}

export async function getServerBuild() {
  if (process.env.NODE_ENV === 'production' || devServer === null) {
    return import(SERVER_DIR);
  }

  const ssrModule = await devServer.ssrLoadModule('virtual:remix/server-build');
  return ssrModule;
}

export async function startDevServer(app: any) {
  if (process.env.NODE_ENV === 'production') return;

  const vite = await import("vite");
  devServer = await vite.createServer({
    server: { middlewareMode: true },
    root: __dirname,
    appType: 'custom',
  });

  app.use(devServer.middlewares);
  return devServer;
}