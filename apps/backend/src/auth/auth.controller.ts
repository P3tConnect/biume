import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserEntity from '../user/entities/create-user.entity';
import LoginUserEntity from '../user/entities/login-user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserEntity: UserEntity) {
    return this.authService.createUser(createUserEntity);
  }

  @Post('/login')
  async login(@Body() loginUserEntity: LoginUserEntity) {
    return this.authService.login(loginUserEntity);
  }
}
