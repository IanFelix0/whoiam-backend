import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, VideoModule, CategoryModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}