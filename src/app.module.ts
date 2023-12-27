import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/common/guards';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    { provide: APP_GUARD, useClass: AtGuard },
  ],
})
export class AppModule {}
