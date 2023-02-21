import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class checkPassDTO {
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
  readonly oldPassword: string;

  @IsNotEmpty({ message: 'O campo password não pode ser vazio.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra, um número e um caractere especial. Password passado: $value',
  })
  readonly newPassword: string;

  @Match('newPassword', { message: 'As senhas não conferem.' })
  @IsNotEmpty({ message: 'O campo confirmar password não pode ser vazio.' })
  readonly newPasswordConfirm: string;
}
