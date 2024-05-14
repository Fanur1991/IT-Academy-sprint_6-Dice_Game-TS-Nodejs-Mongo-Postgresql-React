import MongoPlayerRepository from '.././infrastructure/repositories/mongo/PlayerRepository';
import PostgresPlayerRepository from '.././infrastructure/repositories/postgres/PlayerRepository';
import MongoGameRepository from '.././infrastructure/repositories/mongo/GameRepository';
import PostgresGameRepository from '.././infrastructure/repositories/postgres/GameRepository';
import MongoRankingRepository from '.././infrastructure/repositories/mongo/RankingRepository';
import PostgresRankingRepository from '.././infrastructure/repositories/postgres/RankingRepository';
import dotenv from 'dotenv';

dotenv.config();

const useMongoDB = process.env.USE_MONGO === 'true';

export function getPlayerRepository() {
  if (useMongoDB) {
    return new MongoPlayerRepository();
  } else {
    return new PostgresPlayerRepository();
  }
}

export function getGameRepository() {
  if (useMongoDB) {
    return new MongoGameRepository();
  } else {
    return new PostgresGameRepository();
  }
}

export function getRankingRepository() {
  if (useMongoDB) {
    return new MongoRankingRepository();
  } else {
    return new PostgresRankingRepository();
  }
}
