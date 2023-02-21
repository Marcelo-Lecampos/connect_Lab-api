import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from 'src/users/users.providers';
import { databaseProviders } from '../database/database.providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt.strategy';
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [...databaseProviders, ...userProviders, AuthService, JwtStrategy],
})
export class AuthModule {}
