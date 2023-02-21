import { DataSource } from 'typeorm';
import { Device } from './entities/device.entity';
import { Info } from './entities/info.entity';

export const DevicesProviders = [
  {
    provide: 'INFO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Info),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DEVICES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Device),
    inject: ['DATA_SOURCE'],
  },
];
