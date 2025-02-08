import { Module } from '@nestjs/common';
import { RemixController } from './remix/remix.controller';
import { RemixService } from './remix/remix.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [RemixController],
  providers: [RemixService, PrismaService],
})
export class AppModule {}
