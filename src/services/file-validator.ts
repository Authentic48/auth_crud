import { FileTypeValidator } from '../validators/file-type-validator';
import { FileSizeValidator } from '../validators/file-size-validator';

interface ValidatorResponse {
  isValid: boolean;
  errorMessage: string;
}

const fileTypes = ['.jpg', '.png'];

export const validateFileSize = async (
  fileSize: number
): Promise<ValidatorResponse> => {
  const fileSizeValidator = new FileSizeValidator(fileSize);
  const isValid = fileSizeValidator.validateFileSize();

  return {
    isValid,
    errorMessage: isValid ? '' : fileSizeValidator.getErrorMessage(),
  };
};

export const validateFileType = async (
  fileType: string
): Promise<ValidatorResponse> => {
  const fileTypeValidator = new FileTypeValidator(fileType, fileTypes);
  const isValid = fileTypeValidator.validateFileType();

  return {
    isValid,
    errorMessage: isValid ? '' : fileTypeValidator.getErrorMessage(),
  };
};
