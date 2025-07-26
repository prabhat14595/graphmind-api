
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://graphmind-api.onrender.com/chat',  // Change here for http://localhost:8000/chat
});

export default api;