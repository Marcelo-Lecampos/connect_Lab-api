import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDTO } from './update-address.dto';
import { UserRole } from '../enum/user.role';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: 'fullName deve ser uma string' })
  readonly fullName: string;

  @IsOptional()
  @IsString({ message: 'Endereço da URL da foto deve ser uma string' })
  readonly photoUrl?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'O email fornecido é inválido.',
    },
  )
  readonly email: string;

  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra, um número e um caractere especial. Password passado: $value',
  })
  readonly password: string;

  @IsOptional()
  @IsString({ message: 'phone deve ser uma string' })
  readonly phone?: string;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'O campo role deve ser um UserRole' })
  readonly role: UserRole;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateAddressDTO)
  readonly userAddress: UpdateAddressDTO;
}
