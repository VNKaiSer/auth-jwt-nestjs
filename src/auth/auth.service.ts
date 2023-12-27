import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async logIn(data: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.users.findUnique({
      where: {
        user_name: data.username,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');
    const isMatch = bcrypt.compareSync(data.password, user.passwordHash);
    if (!isMatch) throw new ForbiddenException('Invalid credentials');
    const tokens = await this.getTokens(user.id, user.user_name);
    await this.updateRefeshToken(user.id, tokens.refresh_token);
    return tokens;
  }
  hashData(data: string) {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
  }

  async getTokens(userId: number, username: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        { expiresIn: '15m', secret: process.env.AT_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        { expiresIn: '7d', secret: process.env.RT_SECRET },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signUp(data: AuthDto): Promise<Tokens> {
    const passwordHash = this.hashData(data.password);
    const user = await this.prismaService.users.create({
      data: {
        user_name: data.username,
        passwordHash: passwordHash,
      },
    });
    console.log(user);
    const tokens = await this.getTokens(user.id, user.user_name);
    this.updateRefeshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefeshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = this.hashData(refreshToken);
    await this.prismaService.users.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
  }

  async logOut(userId: number) {
    return await this.prismaService.users.updateMany({
      where: {
        id: userId,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async refeshToken(userId: number, rt: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = bcrypt.compareSync(rt, user.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.user_name);
    await this.updateRefeshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
