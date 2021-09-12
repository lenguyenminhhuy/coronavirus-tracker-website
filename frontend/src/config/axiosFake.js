import axios from 'axios';
const fakeurl = 'https://jsonplaceholder.typicode.com/posts/1'

const axiosFake = axios.create({
    baseURL: fakeurl,
})

export default axiosFake;