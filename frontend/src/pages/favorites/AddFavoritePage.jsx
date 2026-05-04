import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net/api'

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
    fetch(`${API}/users`).then(r => r.json()).then(setUsers)
    fetch(`${API}/restaurants`).then(r => r.json()).then(setRestaurants)
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          user_id: Number(form.user_id),
          restaurant_id: Number(form.restaurant_id),
          rating: Number(form.rating)
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessage('Favorite created!')
      setForm({
        user_id: '',
        restaurant_id: '',
        item_name: '',
        rating: '',
        notes: '',
        photo_url: ''
      })
      setTimeout(() => {
        navigate('/favorites')
      }, 800)
    } catch (err) {
      setMessage(err.message)
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