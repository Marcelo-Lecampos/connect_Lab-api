// import { UserDevice } from 'src/user-devices/entities/user-device.entity';
import { UserDevice } from '../../user-devices/entities/user-device.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Info } from './info.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  photoUrl: string;

  @OneToOne(() => Info, (info) => info.device, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'info_id' })
  info: Info;

  @OneToMany(() => UserDevice, (id) => id.devices, { onDelete: 'SET NULL' })
  userDevice: UserDevice;
}
