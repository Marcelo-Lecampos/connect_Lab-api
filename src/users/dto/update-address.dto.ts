import { PartialType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UserRole } from '../enum/user.role';
import { AddressDTO } from './address-user.dto';

export class UpdateAddressDTO extends PartialType(AddressDTO) {
  @IsDefined()
  @IsString()
  readonly zipCode: string;

  @IsDefined()
  @IsString()
  readonly street: string;

  @IsDefined()
  @IsNumber()
  readonly number: number;

  @IsDefined()
  @IsString()
  readonly neighborhood: string;

  @IsDefined()
  @IsString()
  readonly city: string;

  @IsDefined()
  @IsString()
  readonly state: string;

  @IsDefined()
  @IsString()
  readonly complement: string;
}
