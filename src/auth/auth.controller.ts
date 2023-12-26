import { Controller, Global, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor() {}
  @Post('signin')
  logIn() {}

  @Post('signup')
  signUp() {}

  @Post('logout')
  logOut() {}

  @Post('refesh')
  refeshToken() {}
}
