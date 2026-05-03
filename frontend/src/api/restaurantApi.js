import axios from 'axios'

const BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

const API_URL = `${BASE_URL}/api/restaurants`

export const getRestaurants = () => axios.get(API_URL)
export const getRestaurant = id => axios.get(`${API_URL}/${id}`)
export const createRestaurant = data => axios.post(API_URL, data)
export const updateRestaurant = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteRestaurant = id => axios.delete(`${API_URL}/${id}`)