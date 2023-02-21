import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_address')
export class userAddress {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 100 })
  street: string;

  @Column({})
  number: number;

  @Column({ length: 50 })
  neighborhood: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 100, nullable: true })
  complement?: string;

  @OneToOne(() => UserEntity, (user) => user.userAddress)
  user: UserEntity;
}
