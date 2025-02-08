import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createRequestHandler } from '@remix-run/express';
import { RemixService } from './remix.service';
import { getServerBuild } from '@monorepo/shared';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class RemixController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly remixService: RemixService,
    private readonly authService: AuthService,
  ) {}

  @All('*')
  async handler(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    return createRequestHandler({
      build: await getServerBuild(),
      getLoadContext: () => ({
        remixService: this.remixService,
        authService: this.authService,
        prismaService: this.prismaService,
      }),
    })(request, response, next);
  }
}
