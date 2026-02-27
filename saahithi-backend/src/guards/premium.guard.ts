import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/modules/users/schemas/user.schema';
import { IS_PREMIUM_KEY } from '../decorators/premium.decorator';

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPremiumOnly = this.reflector.getAllAndOverride<boolean>(
      IS_PREMIUM_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isPremiumOnly) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId) return false;

    // Fetch fresh user data to ensure status is current
    const user = await this.userModel
      .findById(userId)
      .select('isPremium')
      .exec();

    if (!user || !user.isPremium) {
      throw new ForbiddenException('This feature is for Premium members only');
    }

    return true;
  }
}
