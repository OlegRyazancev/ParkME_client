import axios from "axios";

let apiUrl = 'http://localhost:9090/api/v1'

if (process.env.REACT_APP_PROFILE_ACTIVE === 'docker') {
    apiUrl = `http://host.docker.internal:${process.env.REACT_APP_BACKEND_PORT}/api/v1`;
    console.log('docker profile');
}
if (process.env.REACT_APP_PROFILE_ACTIVE === 'prod') {
    apiUrl = `https://parkmeserver-production.up.railway.app/api/v1`;
    console.log('prod profile')
}

console.log(apiUrl)

export const API_URL = apiUrl
const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await axios.post(`${API_URL}/auth/refresh`, refreshToken)
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            return $api.request(originalRequest)
        } catch (e) {
            console.log('NOT AUTHORIZED')
        }
    }
    throw error;
})
export default $api