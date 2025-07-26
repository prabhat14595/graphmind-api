
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://graphmind-api.onrender.com/chat',  //Change here for localhost
});

export default api;