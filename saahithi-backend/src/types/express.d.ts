import { AuthUser } from '@/common/interfaces/auth.interface';

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}
