export class FileTypeValidator {
  constructor(private fileType: string, private validTypes: string[]) {}

  validateFileType(): boolean {
    return this.validTypes.includes(this.fileType);
  }

  getErrorMessage(): string {
    return `${this.fileType} is not an accepted file type.`;
  }
}
