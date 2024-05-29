## API Endpoints

- `POST /api/players`: Create a player.
- `PUT /api/players/{id}`: Change a player's name.
- `GET /api/players`: List all players with their success percentages.
- `POST /api/players/login`: Login a player.
- `POST /api/games/{id}`: Perform a dice roll for a specific player.
- `DELETE /api/games/{id}`: Delete a player's game history.
- `GET /api/games/{id}`: List a player's game history.
- `GET /api/ranking`: Retrieve player rankings by success rate and the average success rate.
- `GET /api/ranking/loser`: Identify the player with the lowest success rate.
- `GET /api/ranking/winner`: Identify the player with the highest success rate.
