import axios from 'axios';

// # API SPEED # //
const API_SPEED_URL = process.env.REACT_APP_API_SPEED_URL; 
const API_SPEED_KEY = process.env.REACT_APP_API_SPEED_KEY; 

const APISpeed = axios.create({
    baseURL: API_SPEED_URL,
    headers: {'X-API-KEY': API_SPEED_KEY}
})


export const getComparison = () => APISpeed.post('/api/compare-endpoints');
// export const endpoint2 = () => APISpeed.post('/api/endpoint2');
// export const endpoint3 = () => APISpeed.post('/api/endpoint3');
// export const endpointN = () => APISpeed.post('/api/endpointN');