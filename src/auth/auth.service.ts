import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  logIn(data: AuthDto) {}
  hashData(data: string) {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
  }

  async signUp(data: AuthDto) {
    const passwordHash = this.hashData(data.password);
    return await this.prismaService.users.create({
      data: {
        user_name: data.username,
        passwordHash: passwordHash,
      },
    });
  }

  logOut() {}

  refeshToken() {}
}
