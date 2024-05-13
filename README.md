/project-root
|-- /src
| |-- /config
| | |-- mongoConfig.ts # Настройки подключения MongoDB
| | |-- prismaConfig.ts # Настройки Prisma для PostgreSQL
|
| |-- /controllers # Контроллеры для обработки запросов
| | |-- playerController.ts
| | |-- gameController.ts
| | |-- rankingController.ts
|
| |-- /interfaces # Интерфейсы для репозиториев
| | |-- IPlayerRepository.ts
| | |-- IGameRepository.ts
|
| |-- /models # Модели Mongoose для MongoDB
| | |-- PlayerModel.ts
| | |-- GameModel.ts
|
| |-- /repositories # Репозитории для доступа к данным
| | |-- /mongo # Репозитории для MongoDB
| | | |-- PlayerRepository.ts
| | | |-- GameRepository.ts
| | |-- /postgres # Репозитории для PostgreSQL
| | | |-- PlayerRepository.ts
| | | |-- GameRepository.ts
|
| |-- /routes # Маршруты для маршрутизации запросов
| | |-- playerRoutes.ts
| | |-- gameRoutes.ts
| | |-- rankingRoutes.ts
|
| |-- /services # Сервисы для бизнес-логики
| | |-- playerService.ts
| | |-- gameService.ts
|
| |-- app.ts # Основной файл приложения Express
| |-- server.ts # Точка входа для запуска сервера
|
|-- /tests # Тесты для приложения
| |-- playerTests.ts
| |-- gameTests.ts
|
|-- /prisma # Конфигурация и миграции Prisma
| |-- schema.prisma
|
|-- .env # Переменные окружения
|-- package.json # Менеджер пакетов и скрипты
|-- tsconfig.json # Конфигурация TypeScript
