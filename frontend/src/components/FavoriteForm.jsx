import { useState } from 'react'

export default function FavoriteForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    restaurant: initialData.restaurant || '',
    notes: initialData.notes || '',
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="restaurant" placeholder="Restaurant" value={form.restaurant} onChange={handleChange} />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Add Favorite</button>
    </form>
  )
}
