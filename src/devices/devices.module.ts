import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { DevicesProviders } from './devices.providers';

@Module({
  controllers: [DevicesController],
  providers: [...databaseProviders, ...DevicesProviders, DevicesService],
})
export class DevicesModule {}
