import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  ParseEnumPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryTasksService } from './cloudinary-tasks.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserRole } from '../enums/user';
import { Roles } from '../decorators/roles.decorator';
import { UPLOAD_LOCATION } from '../enums/uploads';
import { UploadLocationPipe } from '../pipes/upload-location.pipe';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cloudinary Uploads')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private cloudinaryTasksService: CloudinaryTasksService,
  ) {}

  /**
   * SECURE SERVER UPLOAD
   * Restricts file size to 5MB and only allows JPG/PNG/WEBP.
   */
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Post('upload/:location')
  @ApiOperation({ summary: 'Upload image (Max 5MB, JPG/PNG/WEBP only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('location', UploadLocationPipe)
    location: UPLOAD_LOCATION,
  ) {
    if (!file) throw new BadRequestException('File is required');
    return await this.cloudinaryService.uploadImage(file, location);
  }

  /**
   * GET SIGNATURE
   * Direct upload helper for React/Next.js to bypass the server.
   */

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get('signature')
  @ApiOperation({ summary: 'Get signature for upload assets from client side' })
  getAvatarSignature(location: UPLOAD_LOCATION) {
    return this.cloudinaryService.getUploadSignature(location);
  }

  /**
   * DELETE ASSET
   */

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Delete('image/:publicId')
  @ApiOperation({ summary: 'Delete image by Public ID' })
  @ApiParam({ name: 'publicId', example: 'foldername/publicId' })
  async deleteImage(@Param('publicId') publicId: string) {
    return await this.cloudinaryService.deleteImage(publicId);
  }

  /**
   * MANUAL ASSET CLEANUP
   */

  @Roles(UserRole.ADMIN)
  @Post('manual-cleanup')
  @ApiOperation({ summary: 'Manually trigger cleanup of orphaned images' })
  async triggerManualCleanup() {
    await this.cloudinaryTasksService.cloudinaryCleanup();

    return {
      success: true,
      message: 'Cleanup complete. Removed orphaned images.',
    };
  }
}
