import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule],
})
export class AuthModule {}
