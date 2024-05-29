# Dice Game Full-Stack Application

This project is a comprehensive dice game application where winning is achieved by rolling a seven. Any other result is considered a loss. The application consists of both frontend and backend components and utilizes two databases: MongoDB and PostgreSQL. The features of the application include user registration and authentication, gameplay for dice, and viewing various statistics.

You can access the postman documentation [here](server/docs/sprint-6.postman_collection.json) and the API endpoints [here](./API.md).

## Technologies

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Ant Design](https://img.shields.io/badge/-Ant_Design-0170FE?style=flat-square&logo=antdesign&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)

## Player Registration and Management

- Players register with a unique name to participate.
- Registration without a name assigns the player as "ANONYMOUS", with multiple such players possible.
- Each player is assigned a unique identifier and registration date.
- Players can delete their roll history but cannot delete specific game entries.

## Important: Project Levels

### Level ⭐️

- ✅ **Uses PostgreSQL with Prisma ORM**.

### Level ⭐️⭐️ 

- ✅ **Creates frontend**.

### Level ⭐️⭐️⭐️

- ✅ **Uses MongoDB with Mongoose for database operations**.

## Frontend

- A frontend is developed to interact with the backend, providing a user-friendly interface for game interaction and viewing statistics.

## Development and Documentation

- Comprehensive API documentation, including route details, parameters, and expected responses.
- Include API testing using tools like Postman or Insomnia.
- Database schema diagrams and Docker instances for DB management are included.

## Testing and CI

- Includes tests to verify the correct functioning of the application.
- Utilizes Continuous Integration (CI) with GitHub Actions.

## Technologies

- The project is developed using TypeScript to enhance code quality and maintainability.

## Setup and Installation

Detailed instructions are provided for setting up and installing the application, ensuring you can get it running in your local development environment seamlessly.

## Contributions

Contributions are welcome. Ensure any pull requests or issues adhere to the established coding standards and include necessary tests for new features.



docker-compose run app npx prisma generate
docker-compose run app npx prisma migrate dev --name init
docker-compose build --no-cache
docker compose up

### Login page

![Login page](./login.png)

### Home page

![Home page](./home.png)

```
/server
|-- /src
|
| |-- /application
| | |-- /dto
| | | |-- player.dto.ts
| | | |-- game.dto.ts
| | | |-- createGame.dto.ts
| | | |-- createPlayer.dto.ts
| | | |-- ranking.dto.ts
| | | |-- updatePlayer.dto.ts
|
| | |-- /services
| | | |-- playerService.ts
| | | |-- gameService.ts
| | | |-- rankingService.ts
|
| |-- /core
| | |-- /domain
| | | |-- /entities
| | | | |-- IGame.ts
| | | | |-- IPlayer.ts
| | | | |-- IRanking.ts
|
| |-- /repositories
| | |-- IGameRepository.ts
| | |-- IPlayerRepository.ts
| | |-- IRankingRepository.ts
|
| |-- /infrastructure
| | |-- /config
| | | |-- mongoConfig.ts
| | | |-- prismaConfig.ts
|
| | |-- /controllers
| | | |-- playerController.ts
| | | |-- gameController.ts
| | | |-- rankingController.ts
|
| | |-- /models
| | | |-- PlayerModel.ts
| | | |-- GameModel.ts
|
| | |-- /repositories
| | | |-- /mongo
| | | | |-- PlayerRepository.ts
| | | | |-- GameRepository.ts
| | | | |-- RankingRepository.ts
| | | |-- /postgres
| | | | |-- PlayerRepository.ts
| | | | |-- GameRepository.ts
| | | | |-- RankingRepository.ts
|
| | |-- /routes
| | | |-- playerRoutes.ts
| | | |-- gameRoutes.ts
| | | |-- rankingRoutes.ts
|
| | |-- /middleware
| | | |-- authMiddleware.ts
|
| | |-- app.ts
|
| |-- index.ts
|
| |-- /tests
| | |-- /application
| | | |-- /services
| | | | |-- playerService.test.ts
| | |-- /infrastructure
| | | |-- /controllers
| | | | |-- playerController.test.ts
|
| |-- /utils
| | |-- getRepository.ts
| | |-- getRandomInt.ts
|
|-- /prisma
| |-- schema.prisma
|
|-- .env
|-- package.json
|-- tsconfig.json
|-- jest.config.json
|-- Dockerfile
|-- docker-compose.yml
|-- .gitignore
```
