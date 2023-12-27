import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, RtStrategy, AtStrategy],
  controllers: [AuthController],
  imports: [PrismaModule, JwtModule.register({})],
})
export class AuthModule {}
