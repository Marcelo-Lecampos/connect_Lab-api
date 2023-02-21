import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class AddressDTO {
  @IsString({ message: 'O campo zipCode deve ser uma string' })
  @Matches(/^\d{8}$/, {
    message: 'O campo zipCode deve conter 8 números',
  })
  @IsNotEmpty({ message: 'O campo zipCode não pode ser vazio.' })
  readonly zipCode: string;

  @IsString({ message: 'O campo street deve ser uma string' })
  @IsNotEmpty({ message: 'O campo street não pode ser vazio.' })
  readonly street: string;

  @IsNumber({}, { message: 'O campo number deve ser um número' })
  @IsNotEmpty({ message: 'O campo number não pode ser vazio.' })
  readonly number: number;

  @IsNotEmpty({ message: 'O campo neighborhood não pode ser vazio.' })
  @IsString({ message: 'O campo neighborhood deve ser uma string' })
  readonly neighborhood: string;

  @IsNotEmpty({ message: 'O campo city não pode ser vazio.' })
  @IsString({ message: 'O campo city deve ser uma string' })
  readonly city: string;

  @IsNotEmpty({ message: 'O campo state não pode ser vazio.' })
  @IsString({ message: 'O campo state deve ser uma string' })
  readonly state: string;

  @IsOptional()
  @IsDefined()
  @IsString({ message: 'O campo complement deve ser uma string' })
  complement?: string;
}
