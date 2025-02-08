import { Module } from '@nestjs/common';
import { RemixController } from './remix/remix.controller';
import { RemixService } from './remix/remix.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [RemixController, AuthController, UserController],
  providers: [RemixService, PrismaService, AuthService, UserService],
})
export class AppModule {}
