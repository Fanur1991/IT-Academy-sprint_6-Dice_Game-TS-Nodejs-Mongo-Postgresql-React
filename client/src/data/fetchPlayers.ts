import axios from 'axios';

export const fetchPlayers = async (): Promise<any> => {
  try {
    const response = await axios.get('http://localhost:3002/api/players', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    console.log('Players fetched successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch players:', error);
  }
};
