import { useState } from 'react'
import { createRestaurant } from '@/api/restaurantApi'
import { useNavigate } from 'react-router-dom'

export default function AddRestaurantPage() {
  const [form, setForm] = useState({
    name: '',
    cuisine: '',
    location: ''
  })

  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createRestaurant(form)
      setMessage('Restaurant added!')
      setForm({ name: '', cuisine: '', location: '' })
      setTimeout(() => {
        navigate('/restaurants')
      }, 800)
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div>
      <h1>Add Restaurant</h1>

      {message && <p className="error">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="cuisine" placeholder="Cuisine" value={form.cuisine} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />

        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  )
}