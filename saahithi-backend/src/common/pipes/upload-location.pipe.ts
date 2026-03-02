import { BadRequestException, ParseEnumPipe } from '@nestjs/common';
import { UPLOAD_LOCATION } from '../constants/uploads';

export const UploadLocationPipe = new ParseEnumPipe(UPLOAD_LOCATION, {
  exceptionFactory: () =>
    new BadRequestException(
      `Invalid folder name. Use: ${Object.values(UPLOAD_LOCATION).join(' or ')}`,
    ),
});
