import { SetMetadata } from '@nestjs/common';

export const IS_PREMIUM_KEY = 'isPremiumOnly';
export const PremiumOnly = () => SetMetadata(IS_PREMIUM_KEY, true);
