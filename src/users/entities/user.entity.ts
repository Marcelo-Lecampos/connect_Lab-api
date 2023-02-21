import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { userAddress } from './address.entity';
// importações para bcrypt
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer'; // importante porque o password não deve ser retornado no JSON
import { UserRole } from '../enum/user.role';
import { UserDevice } from '../../user-devices/entities/user-device.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @Exclude()
  @Column({ nullable: false })
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @OneToOne(() => userAddress, (address) => address.user, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'address.id' })
  userAddress: userAddress;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  @OneToMany(() => UserDevice, (user) => user._id, { onDelete: 'SET NULL' })
  userDevices: UserDevice;
}
