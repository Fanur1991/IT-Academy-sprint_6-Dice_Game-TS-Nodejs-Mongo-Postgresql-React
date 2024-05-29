# Dice Game Full-Stack Application

This project is a comprehensive dice game application where winning is achieved by rolling a seven. Any other result is considered a loss. The application consists of both frontend and backend components and utilizes two databases: MongoDB and PostgreSQL. The features of the application include user registration and authentication, gameplay for dice, and viewing various statistics.

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

## Important: Project Levels

### Level ⭐️

✅ **Uses PostgreSQL with Prisma ORM**.

### Level ⭐️⭐️

✅ **Creates frontend**.

### Level ⭐️⭐️⭐️

✅ **Uses MongoDB with Mongoose for database operations**.

## Development and Documentation

- Comprehensive API documentation, including route details, parameters, and expected responses [here](server/docs/sprint-6.postman_collection.json).
- API endpoints [here](./API.md).
- Database schema diagrams [here](server/docs/Diagram.jpg).

## Important!

To switch between MongoDB and PostgreSQL, you need to update the .env file. Set the USE_MONGO variable to **true** for using **MongoDB**, and to **false** for using **PostgreSQL**.

## Previous requirements

- Make sure you have [Node.js](https://nodejs.org/en/download/package-manager) installed.
- [Docker](https://www.docker.com/products/docker-desktop/).

### Steps to Start the application

## `Download The Project`

```
git clone https://github.com/Fanur1991/IT-Academy-sprint_6-Dice_Game-TS-Nodejs-Mongo-Postgresql-React.git
cd IT-Academy-sprint_6-Dice_Game-TS-Nodejs-Mongo-Postgresql-React
```

### `Install Dependencies`

```
cd server
npm install
cd ../client
npm install
```

### `Run Docker with MongoDB`

```
cd ../server
docker compose up
```

This will start the backend server on http://localhost:3002/

To stop docker containers

```
docker compose stop
```

### `Run Docker with Prisma ORM`

**!!!Change the USE_MONGO variable in .env to false**

```
cd server
docker compose up
```

### `Run Prisma Generate and Migrate`

```
docker-compose run app npx prisma generate
docker-compose run app npx prisma migrate dev --name init
```

### `Run Client`

```
cd client
npm run dev
```

This will start the client on http://localhost:5173/

### `Stop and Delete Docker Containers`

```
docker compose down
```

### `Run Tests`

```
cd server
npm run test
```

## Frontend

A frontend is developed to interact with the backend, providing a user-friendly interface for game interaction and viewing statistics.

### Login page:

![Login page](./login.png)

### Home page:

![Home page](./home.png)

## Testing and CI

- Includes tests to verify the correct functioning of the application.
- Utilizes Continuous Integration (CI) with GitHub Actions.

## Folder and Directory Structure

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
| | | | |-- gameService.test.ts
| | | | |-- rankingService.test.ts
| | |-- /infrastructure
| | | |-- /controllers
| | | | |-- playerController.test.ts
| | | | |-- gameController.test.ts
| | | | |-- rankingController.test.ts
|
| |-- /utils
| | |-- getRepository.ts
| | |-- getRandomInt.ts
|
|-- /prisma
| |-- schema.prisma
|
| |-- /docs
| | |-- sprint-6.postman_collection.json
| | |-- Diagram.jpg
|
|-- .env
|-- package.json
|-- tsconfig.json
|-- jest.config.json
|-- Dockerfile
|-- docker-compose.yml
|-- .gitignore
```

## License

This project is distributed under the Apache 2.0 license.

---

Developed by [Fanur Khusainov](https://www.linkedin.com/in/fanur-khusainov-ab86b2102/) with ❤️ and ☕.
