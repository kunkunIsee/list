import axios from 'axios'

const serve = axios.create({
    timeout: 5000,
    baseURL: 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http'
})
serve.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})
serve.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})
export default serve