import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/request-validation';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/bad-request-error';

const route = express.Router();

route.post(
  '/api/users/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.scope('withpassword').findOne({ where: { email: email } });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await Password.Compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    return res.status(200).send({
      id: existingUser.id,
      firstName: existingUser.firstName,
      email: existingUser.email,
      token: token,
    });
  }
);

export { route as signinRouter };
