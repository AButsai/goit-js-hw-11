import axios from 'axios';

async function apiResponse(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default apiResponse;
