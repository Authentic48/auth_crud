import express, { Request, Response } from 'express';
import User from '../models/user';

const route = express.Router();

route.get('/api/profile/:id', async (req: Request, res: Response) => {
  
  const user = await User.findByPk(req.params.id);

  if(!user){
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).send(user);
});

export { route as getUserProfileRouter };
