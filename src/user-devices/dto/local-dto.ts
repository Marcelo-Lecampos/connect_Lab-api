import { IsEnum, IsOptional } from 'class-validator';
import { LocalRole } from '../enum/local.role';

export class LocalDTO {
  @IsOptional()
  @IsEnum(LocalRole, { message: 'Passe um LocalRole válido' })
  readonly local: LocalRole;
}
