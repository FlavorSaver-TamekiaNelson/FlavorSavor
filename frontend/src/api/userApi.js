import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '[localhost](http://localhost:5001/api/users)'

export const registerUser = async data => axios.post(`${API_URL}/register`, data)
export const loginUser = async data => axios.post(`${API_URL}/login`, data)
export const getUserProfile = async token =>
  axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
