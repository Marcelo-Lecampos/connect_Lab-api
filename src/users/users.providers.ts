import { DataSource } from 'typeorm';
import { userAddress } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(userAddress),
    inject: ['DATA_SOURCE'],
  },
];
