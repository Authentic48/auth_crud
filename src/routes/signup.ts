import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

const route = express.Router();

route.post(
  '/api/users/register',
  [
    body('firstName').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    // Destructuring the incoming data
    const { firstName, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await Password.Hash(password);
    const user = await User.create({
      firstName,
      email,
      password: hashedPassword,
      dateOfRegistration: new Date().toLocaleDateString(),
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
      process.env.JWT_KEY!
    );
    return res.status(201).send({
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      token: token,
    });
  }
);

export { route as signupRouter };
