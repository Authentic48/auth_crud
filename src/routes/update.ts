import express, { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { body } from 'express-validator';
import path from 'path';

import User from '../models/user';
import { ImageUploader } from '../services/upload';
import { validateFileSize } from '../services/file-validator';
import { validateFileType } from '../services/file-validator';
import { validateRequest } from '../middlewares/request-validation';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';

const route = express.Router();

route.put(
  '/api/profile/:id',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('firstName').notEmpty().withMessage('fisrtName must be supplied'),
    body('lastName').notEmpty().withMessage('lastName must be supplied'),
    body('gender')
      .notEmpty()
      .withMessage('Gender must be supplied')
      .isString()
      .withMessage('Gender must be a string.')
      .isIn(['Male', 'Female'])
      .withMessage('Gender doesn\t contain valid value'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, firstName, lastName, photo, gender } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError();
    }

    if (!req.files || Object.keys(req.files).length === 0) {
       throw new BadRequestError('No file was uploaded');
    }

    const { name, size } = req.files.photo as UploadedFile;
    const validateType = await validateFileType(path.extname(name));
    const validateSize = await validateFileSize(size);

    if (!validateType.isValid || !validateSize.isValid) {
      throw new BadRequestError('Invalid file type / size');
    }

    const imgPath = await ImageUploader.upload(req.files.photo as UploadedFile);

    user.set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      photoUrl: imgPath,
    });

    user.save();

    return res.status(200).send(user);
  }
);

export { route as updateProfileRouter };
