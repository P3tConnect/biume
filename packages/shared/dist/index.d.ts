import type { ViteDevServer } from 'vite';
export declare const getPublicDir: () => string;
export declare function startDevServer(app: any): Promise<ViteDevServer | undefined>;
export declare function getServerBuild(): Promise<any>;
