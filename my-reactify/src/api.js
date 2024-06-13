import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update with your server URL if necessary

export const getOpenAIResponse = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/openai`, { message });
    return response.data.reply;
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error.message); // Log error message
    throw error;
  }
};
