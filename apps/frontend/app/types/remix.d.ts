import type { RemixService, AuthService, PrismaService } from '@monorepo/backend';

declare module '@remix-run/node' {
  interface AppLoadContext {
    remixService: RemixService;
    authService: AuthService;
    prismaService: PrismaService;
  }
}
