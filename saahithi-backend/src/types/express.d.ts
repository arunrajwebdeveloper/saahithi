import { User as UserEntity } from '@/modules/users/schemas/user.schema';

declare global {
  namespace Express {
    interface User {
      userId: string;
      email: string;
    }

    interface Request {
      user?: User;
    }
  }
}
