import { UploadedFile } from 'express-fileupload';
import { promises as fs } from 'fs';
import { join } from 'path';

export class ImageUploader {
  static async upload(file: UploadedFile) {
    const { name, data } = file;
    const cwd = process.cwd();

    await fs.writeFile(join(cwd,'uploads', name), data);

    return `uploads/${name}`;
  }
}
