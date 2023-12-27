import { FastifyRequest } from 'fastify';
import {
  Body,
  Controller,
  Global,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiProperty,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthDto })
  logIn(@Body() body: AuthDto) {
    return this.authService.logIn(body);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: AuthDto })
  signUp(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/log-out')
  @HttpCode(HttpStatus.OK)
  // @ApiHeader({ name: 'Authorization', description: 'Bearer' })
  @ApiQuery({ name: 'id', type: Number })
  @ApiBearerAuth('JWT-auth')
  logOut(
    @Query('id', new ParseIntPipe())
    id: number,
  ) {
    console.log(id);
    return this.authService.logOut(id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('/refesh')
  refeshToken() {}
}
