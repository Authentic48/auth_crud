import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

const route = express.Router();

route.post(
  '/api/users/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  async (req: Request, res: Response) => {
    // Destructuring the incoming data
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
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
