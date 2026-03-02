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
import { UserRole } from '../constants/user';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cloudinary Media')
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
  @Post('upload')
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
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');
    return await this.cloudinaryService.uploadImage(file);
  }

  /**
   * GET SIGNATURE
   * Direct upload helper for React/Next.js to bypass the server.
   */
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get('signature')
  @ApiOperation({ summary: 'Generate signature for direct frontend uploads' })
  getUploadSignature() {
    return this.cloudinaryService.getUploadSignature();
  }

  /**
   * DELETE ASSET
   */

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Delete('image/:publicId')
  @ApiOperation({ summary: 'Delete image by Public ID' })
  @ApiParam({ name: 'publicId', example: 'user_content/sample_123' })
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
    const deletedCount = await this.cloudinaryTasksService.cloudinaryCleanup();

    return {
      success: true,
      message: `Cleaned up ${deletedCount} images`,
    };
  }
}
