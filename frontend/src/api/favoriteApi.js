import axios from 'axios'

const BASE_URL =
    import.meta.env.VITE_API_URL ||
    'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

const API_URL = `${BASE_URL}/api/favorites`

export const getFavorites = async () => axios.get(API_URL)
export const addFavorite = async data => axios.post(API_URL, data)
export const removeFavorite = async id => axios.delete(`${API_URL}/${id}`)