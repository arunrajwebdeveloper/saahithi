import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../constants/user';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
