import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserEntity from '../user/entities/create-user.entity';
import LoginUserEntity from '../user/entities/login-user.entity';
import { Tokens } from './types/token-type';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { AccessTokenAuthGuard } from './guards/accessToken-auth.guard';
import { RefreshTokenAuthGuard } from './guards';
import { GetCurrentUser } from './decorators';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signin')
  signin(@Body() dto: LoginUserEntity): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('/signup')
  signup(@Body() dto: UserEntity): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post('/signout')
  signOut(@GetCurrentUserId() userId: string) {
    return this.authService.signOut(userId);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('/refresh')
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  validateToken(token: string): boolean {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      return decoded ? true : false;
    } catch (err) {
      console.error('Token validation failed:', err.message);
      return false;
    }
  }
}
