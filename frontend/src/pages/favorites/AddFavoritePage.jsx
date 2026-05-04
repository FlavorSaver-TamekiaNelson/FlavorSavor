import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addFavorite } from '@/api/favoriteApi'
import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

export default function AddFavoritePage() {
  const [users, setUsers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    user_id: '',
    restaurant_id: '',
    item_name: '',
    rating: '',
    notes: '',
    photo_url: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${BASE_URL}/api/users`).then(r => setUsers(r.data))
    axios.get(`${BASE_URL}/api/restaurants`).then(r => setRestaurants(r.data))
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addFavorite({
        ...form,
        user_id: Number(form.user_id),
        restaurant_id: Number(form.restaurant_id),
        rating: Number(form.rating)
      })
      setMessage('Favorite created!')
      setForm({
        user_id: '',
        restaurant_id: '',
        item_name: '',
        rating: '',
        notes: '',
        photo_url: ''
      })
      setTimeout(() => navigate('/favorites'), 800)
    } catch (err) {
      setMessage(err.response?.data?.error || err.message)
    }
  }

  return (
    <div>
      <h1>Add Favorite</h1>
      {message && <p className="error">{message}</p>}
      <form onSubmit={handleSubmit}>
        <select name="user_id" value={form.user_id} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.email}</option>
          ))}
        </select>
        <select name="restaurant_id" value={form.restaurant_id} onChange={handleChange}>
          <option value="">Select Restaurant</option>
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <input name="item_name" placeholder="Item name" value={form.item_name} onChange={handleChange} />
        <input name="rating" type="number" placeholder="Rating" value={form.rating} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <input name="photo_url" placeholder="Photo URL" value={form.photo_url} onChange={handleChange} />
        <button type="submit">Create Favorite</button>
      </form>
    </div>
  )
}