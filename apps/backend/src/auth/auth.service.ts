import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { Tokens } from './types/token-type';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import LoginUserEntity from 'src/user/entities/login-user.entity';
import UserEntity from 'src/user/entities/create-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: LoginUserEntity): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const passwordMatches = await argon2.verify(dto.password, user.password);

    if (!user || !passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUp(dto: UserEntity): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access denied');

    const refreshTokenMatch = await argon2.verify(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signOut(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async findUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async hashData(data: string): Promise<string> {
    if (!data) {
      throw new Error('Data to hash cannot be empty.');
    }
    return argon2.hash(data);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.secret,
          expiresIn: '1h', // 1 heure
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.secret,
          expiresIn: '7d', // 7 jours
        },
      ),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async validateAccessToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      // Cherche l'utilisateur dans la BDD en fonction du "sub" (userId)
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.sub,
        },
      });

      if (!user)
        throw new ForbiddenException('Invalid token or user not found');
      return user; // retourne l'utilisateur si tout est valide
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  }
}
