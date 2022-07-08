import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import User from '../models/user';

const route = express.Router();

route.get('/api/profile/:id', async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    throw new NotFoundError();
  }

  return res.status(200).send(user);
});

export { route as getUserProfileRouter };
