import { UserRole } from 'src/users/enum/user.role';

export class JwtPayloadUser {
  id: number;
  firstName: string;
  email: string;
  url: string;
  role: UserRole;
}
