import { Type } from 'class-transformer';
import {
  IsString,
  IsObject,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { InfoDTO } from './info.dto';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  madeBy: string;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => InfoDTO)
  readonly info: InfoDTO;
}
