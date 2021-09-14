import axios from 'axios';

const axiosCovid = axios.create({
    baseURL: 'https://api.minhthings.com',
})

export default axiosCovid;