import { Body, Controller, Global, Post } from '@nestjs/common';
import { ApiBody, ApiTags, ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-in')
  @ApiBody({ type: AuthDto })
  logIn(@Body() body: AuthDto) {
    return this.authService.logIn(body);
  }

  @Post('/sign-up')
  @ApiBody({ type: AuthDto })
  signUp(@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }

  @Post('/log-out')
  logOut() {}

  @Post('/refesh')
  refeshToken() {}
}
