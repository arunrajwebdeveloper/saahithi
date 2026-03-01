import { UserRole } from '@/modules/auth/dto/register-user.dto';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
