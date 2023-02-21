import { Device } from '../../devices/entities/device.entity';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalRole } from '../enum/local.role';

@Entity('user_devices')
export class UserDevice {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  is_on: boolean;

  @Column({ type: 'enum', enum: LocalRole })
  local: LocalRole;

  @Column({ length: 50 })
  room: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (userDevices) => userDevices._id, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => Device, (device) => device.userDevice, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'device_id' })
  devices: Device;
}
