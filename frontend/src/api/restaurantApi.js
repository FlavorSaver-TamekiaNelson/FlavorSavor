import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/restaurants`
    : 'http://localhost:5001/api/restaurants'

export const getRestaurants = () => axios.get(API_URL)
export const getRestaurant = id => axios.get(`${API_URL}/${id}`)
export const createRestaurant = data => axios.post(API_URL, data)
export const updateRestaurant = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteRestaurant = id => axios.delete(`${API_URL}/${id}`)
