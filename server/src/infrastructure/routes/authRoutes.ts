import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import PlayerModel, { IPlayerDocument } from '../models/PlayerModel';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const player = new PlayerModel({
      name,
      email,
      password: hashedPassword,
    } as IPlayerDocument);
    await player.save();
    res.status(201).send('User registered');
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  try {
    const player = await PlayerModel.findOne({ email });
    if (!player) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: player._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

export default router;
