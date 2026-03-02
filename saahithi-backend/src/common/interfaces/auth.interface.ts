import { UserRole } from '../enums/user';

export interface AuthUser {
  userId: string;
  email: string;
  sub: string;
  role: UserRole;
  isPremium: boolean;
}
