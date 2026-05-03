import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

const API_URL = `${BASE_URL}/api/users`

export const registerUser = async data =>
  axios.post(`${API_URL}/register`, data)

export const loginUser = async data =>
  axios.post(`${API_URL}/login`, data)

export const getUserProfile = async token =>
  axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })