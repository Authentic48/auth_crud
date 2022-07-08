import express, { Request, Response } from 'express';
import User from '../models/user';

const route = express.Router();

route.get('/api/profile', async (req: Request, res: Response) => {
  const { page, size } = req.query;

  const users = await User.findAndCountAll({
    limit: Number(size),
    offset: Number(size) * Number(page),
  });

  return res.status(200).send(users);
});

export { route as getUsersRouter };
