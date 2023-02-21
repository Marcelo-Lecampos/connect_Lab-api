import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from './users.providers';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [...databaseProviders, ...userProviders, JwtService, UsersService],
})
export class UsersModule {}
