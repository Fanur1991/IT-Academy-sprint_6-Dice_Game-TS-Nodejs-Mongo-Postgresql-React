import axios from 'axios';

export const fetchPlayerGames = async (playerId: string, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/api/games/${playerId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    console.log('Games fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch games:', error);
  }
};
