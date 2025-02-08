import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import LoginUserEntity from '../user/entities/login-user.entity';
import * as argon2 from 'argon2';
import SignupUserEntity from '../user/entities/signup-user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserEntity: SignupUserEntity): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: createUserEntity.name,
        email: createUserEntity.email,
        password: await argon2.hash(createUserEntity.password, {
          hashLength: 32,
          timeCost: 3,
          salt: Buffer.from('c2Nrhd3P8cLC03B8', 'hex'),
          memoryCost: 1 << 16,
          parallelism: 4,
          type: argon2.argon2id,
          version: 0x13,
        }),
      },
    });
    return createdUser;
  }

  async login(loginUserEntity: LoginUserEntity): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserEntity.email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      loginUserEntity.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
