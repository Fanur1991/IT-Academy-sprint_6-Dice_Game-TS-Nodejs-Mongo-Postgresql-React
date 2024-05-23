import axios from 'axios';

export const fetchRankings = async () => {
  try {
    const response = await axios.get('http://localhost:3002/api/ranking');
    console.log('Rankings fetched successfully:', response.data);
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
  }
};
