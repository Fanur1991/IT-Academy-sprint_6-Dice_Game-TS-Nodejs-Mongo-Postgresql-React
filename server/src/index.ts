import app from './infrastructure/app';
import dotenv from 'dotenv';
import connectMongoDB from './infrastructure/config/mongoConfig';

dotenv.config();

const PORT = process.env.PORT || 3005;

(async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
