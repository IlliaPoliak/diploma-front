import axios from 'axios'

export const API_URL = 'http://127.0.0.1:8000/api/v1/'

export const instance = axios.create({
    withCredentials: false,
    baseURL: API_URL,
    // headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:3000'
    // }
})
