import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from './device.entity';

@Entity('device_Info')
export class Info {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  virtual_id: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @Column()
  signal: string;

  @OneToOne(() => Device, (device) => device.info)
  device: Device;
}
