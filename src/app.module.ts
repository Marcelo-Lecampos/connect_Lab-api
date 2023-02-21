import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config'; // npm i @nestjs/config
import { AuthModule } from './core/auth/auth.module'; // npm i @nestjs/jwt passport passport-jwt
import { DevicesModule } from './devices/devices.module';
import { UserDevicesModule } from './user-devices/user-devices.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    DevicesModule,
    UserDevicesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
