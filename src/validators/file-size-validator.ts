export class FileSizeValidator {
  private maxFileSizeInBytes: Number = 10485760;

  constructor(private fileSizeInBytes: Number) {}

  validateFileSize(): boolean {
    return this.fileSizeInBytes <= this.maxFileSizeInBytes;
  }

  getErrorMessage(): string {
    return 'Maximum file size accepted is 10MB.';
  }
}
