import app from './infrastructure/app';
import dotenv from 'dotenv';
import connectMongoDB from './infrastructure/config/mongoConfig';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const PORT = process.env.PORT || 3005;

// If a environment variable USE_MONGO is true, connect to MongoDB. Otherwise, to PostgreSQL with Prisma.
// To change a database, change the value of the USE_MONGO environment variable in the .env file.
const USE_MONGO = process.env.USE_MONGO;

(async () => {
  if (USE_MONGO === 'true') {
    await connectMongoDB();
  } else {
    new PrismaClient();
    console.log('Connected to PostgreSQL with Prisma');
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
