import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // modulePathIgnorePatterns: [
  //   'src/utils/getRepository',
  //   'src/utils/getRandomInt',
  //   'src/application/services/authService',
  //   'src/infrastructure/repositories/mongo',
  //   'src/infrastructure/repositories/postgres',
  // ],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/getRepository.ts',
    '!src/**/getRandomInt.ts',
    '!src/**/authService.ts',
    '!src/**/repositories/mongo/**',
    '!src/**/repositories/postgres/**',
    '!src/**/core/domain/entities/**',
    '!src/**/core/repositories/**',
    '!src/**/application/dto/**',
    '!src/**/infrastructure/config/mongoConfig.ts',
    '!src/index.ts',
  ],
};

export default config;
