import axios from 'axios';

const axiosCovid = axios.create({
    baseURL: 'https://iatzzq8or2.execute-api.us-east-2.amazonaws.com/Prod',
})

export default axiosCovid;