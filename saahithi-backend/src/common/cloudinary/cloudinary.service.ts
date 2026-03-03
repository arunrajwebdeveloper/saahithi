import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  /**
   * SERVER-SIDE UPLOAD (Multer)
   * Uploads a file buffer directly to Cloudinary with AI moderation.
   */
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder,
          // moderation: 'aws_rek', // Automatic AI NSFW check
        },
        (error, result: any) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  /**
   * SIGNED UPLOAD (For React/Next.js)
   * Returns a signature so the frontend can upload directly to Cloudinary.
   */
  getUploadSignature(folder: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
        // moderation: 'aws_rek'
      },
      process.env.CLD_API_SECRET!,
    );

    return {
      timestamp,
      signature,
      apiKey: process.env.CLD_API_KEY,
      cloudName: process.env.CLD_CLOUD_NAME,
    };
  }

  /**
   * DELETE IMAGE
   * Removes an asset from Cloudinary using its Public ID.
   */
  async deleteImage(publicId: string) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      this.logger.error(`Delete failed for: ${publicId}`, error?.message);
    }
  }

  /**
   * DELETE RESOURCES
   * Removes assets from Cloudinary using its Public IDs.
   */

  async deleteResources(publicIds: string[]) {
    if (!publicIds || publicIds.length === 0) return;

    try {
      return await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
      throw new InternalServerErrorException('Cloudinary deletion failed');
    }
  }

  /**
   * DELETE FOLDER ASSETS
   * Removes all folder assets from Cloudinary.
   */

  async deleteFolderAssets(folderPath: string) {
    try {
      // Delete all resources inside the folder
      await cloudinary.api.delete_resources_by_prefix(folderPath);
      return { success: true };
    } catch (error) {
      console.error('Folder assets deletion failed', error);
    }
  }

  /**
   * DELETE FOLDER
   * Removes folder from Cloudinary.
   */

  async deleteFolder(folderPath: string) {
    try {
      // Delete the folder
      await cloudinary.api.delete_folder(folderPath);

      return { success: true };
    } catch (error) {
      console.error('Folder deletion failed', error);
    }
  }

  /**
   * CLEANUP (Admin/Cron)
   * Deletes images from Cloudinary that no longer exist in your Database.
   */
  async cleanupOrphanedImages(dbIds: Set<string>, folder: string) {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: `${folder}/`,
      max_results: 500,
    });

    const orphanedIds = resources
      .map((res: any) => res.public_id)
      .filter((id: string) => !dbIds.has(id));

    if (orphanedIds.length > 0) {
      await cloudinary.api.delete_resources(orphanedIds);
    }
    return orphanedIds.length;
  }
}
