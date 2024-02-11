import axios from 'axios';

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
});

export default axiosInstance;