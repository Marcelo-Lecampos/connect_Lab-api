import { Module } from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { UserDevicesController } from './user-devices.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userDevicesProviders } from './user-devices.provider';

@Module({
  controllers: [UserDevicesController],
  providers: [
    ...databaseProviders,
    ...userDevicesProviders,
    UserDevicesService,
  ],
})
export class UserDevicesModule {}
