import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AuthService } from '../../application/services/authService';

dotenv.config();

const authService = new AuthService();

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token is missing or invalid' });
    return;
  }

  try {
    const user = await authService.verifyToken(token);

    (req as any).user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
