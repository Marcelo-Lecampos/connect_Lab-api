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
import { Match } from 'src/core/constraints/match.decorator';
import { UserRole } from '../enum/user.role';
import { AddressDTO } from './address-user.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo fullName não pode ser vazio.' })
  @IsString({ message: 'fullName deve ser uma string' })
  readonly fullName: string;

  @IsString({ message: 'Endereço da URL da foto deve ser uma string' })
  readonly photoUrl?: string;

  @IsNotEmpty({ message: 'O campo email não pode ser vazio.' })
  @IsEmail(
    {},
    {
      message: 'O email fornecido é inválido.',
    },
  )
  readonly email: string;

  @IsNotEmpty({ message: 'O campo password não pode ser vazio.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra, um número e um caractere especial. Password passado: $value',
  })
  readonly password: string;

  @Match('password', { message: 'As senhas não conferem.' })
  @IsNotEmpty({ message: 'O campo confirmar password não pode ser vazio.' })
  readonly confirmPassword: string;

  @IsOptional()
  @IsString({ message: 'phone deve ser uma string' })
  readonly phone?: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  readonly userAddress: AddressDTO;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'O campo role deve ser um UserRole' })
  readonly role: UserRole;
}
