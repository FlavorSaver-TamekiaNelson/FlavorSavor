import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/favorites'

export const getFavorites = async () => axios.get(API_URL)
export const addFavorite = async data => axios.post(API_URL, data)
export const removeFavorite = async id => axios.delete(`${API_URL}/${id}`)
