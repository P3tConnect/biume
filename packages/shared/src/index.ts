import * as path from 'node:path';
import type { ViteDevServer } from 'vite';

let devServer: ViteDevServer | null = null;

const getFrontendPath = () => {
  const currentDir = process.cwd();
  const monorepoRoot = path.resolve(currentDir, '../../');
  return path.join(monorepoRoot, 'apps/frontend');
};

export const getPublicDir = () => {
  return path.join(getFrontendPath(), 'public');
};

export async function startDevServer(app: any) {
  if (process.env.NODE_ENV === 'production') return;

  const vite = await import("vite");
  devServer = await vite.createServer({
    server: { middlewareMode: true },
    root: getFrontendPath(),
    appType: 'custom',
  });

  app.use(devServer.middlewares);
  return devServer;
}

export async function getServerBuild() {
  const buildPath = path.join(getFrontendPath(), 'build/index.js');
  
  if (process.env.NODE_ENV === 'production' || devServer === null) {
    return import(buildPath);
  }

  const ssrModule = await devServer.ssrLoadModule('virtual:remix/server-build');
  return ssrModule;
} 