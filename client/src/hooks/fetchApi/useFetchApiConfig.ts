import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
  withCredentials: true,
})
