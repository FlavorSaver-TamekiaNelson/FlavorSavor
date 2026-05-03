import { useState } from 'react'

export default function RestaurantForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    cuisine: initialData.cuisine || '',
    location: initialData.location || '',
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="cuisine" placeholder="Cuisine" value={form.cuisine} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  )
}
