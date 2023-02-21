import { Device } from '../devices/entities/device.entity';
import { DataSource } from 'typeorm';
import { UserDevice } from './entities/user-device.entity';

export const userDevicesProviders = [
  {
    provide: 'USER_DEVICES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserDevice),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Device),
    inject: ['DATA_SOURCE'],
  },
];
