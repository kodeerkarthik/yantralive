import axios from 'axios'

const api = axios.create({
    baseURL:  'https://api.yantralive.com',
})

export default api;