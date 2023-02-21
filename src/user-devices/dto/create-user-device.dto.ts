import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LocalRole } from '../enum/local.role';

export class CreateUserDeviceDto {
  //   @IsNotEmpty()
  //   _id: number;

  //   @IsNotEmpty()
  //   @IsBoolean()
  //   is_on: boolean;

  @IsNotEmpty()
  @IsEnum(LocalRole, { message: 'Passe um LocalRole válido' })
  readonly local: LocalRole;

  @IsString()
  @IsNotEmpty()
  readonly room: string;

  // @IsNotEmpty()
  // readonly user: UserEntity;

  // @IsNotEmpty()
  // readonly devices: Device[];
}
