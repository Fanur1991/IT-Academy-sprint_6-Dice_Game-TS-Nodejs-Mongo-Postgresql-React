import express, { Express } from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import playerRoutes from './routes/playerRoutes';
import rankingRoutes from './routes/rankingRoutes';
import testRoute from './routes/testRoute';
import { requireAuth } from './middleware/authMiddleware';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/games', requireAuth, gameRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/ranking', requireAuth, rankingRoutes);
app.use('/test', testRoute);

export default app;
