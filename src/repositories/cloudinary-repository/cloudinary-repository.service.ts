import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'node:stream';

@Injectable()
export class CloudinaryRepositoryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadStream(readableStream: Readable): Promise<UploadApiResponse> {
    const buffer = await this.streamToBuffer(readableStream);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'uploads',
            type: 'upload',
            resource_type: 'image',
            format: 'jpg',
            transformation: [
              { width: 1024, height: 1024, crop: 'limit' },
              { quality: 'auto', fetch_format: 'jpg' },
              { crop: 'auto' },
            ],
          },
          (error, result: UploadApiResponse) => {
            if (error) {
              console.log('error =>', error);
              return reject(error);
            }
            resolve(result);
          },
        )
        .end(buffer);
    });
  }

  private async streamToBuffer(readableStream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      readableStream.on('data', (chunk) => chunks.push(chunk));
      readableStream.on('end', () => resolve(Buffer.concat(chunks)));
      readableStream.on('error', reject);
    });
  }
}
