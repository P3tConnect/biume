import type { RemixService } from '@monorepo/backend';

declare module '@remix-run/node' {
  interface AppLoadContext {
    remixService: RemixService;
  }
} 