import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
export default function EditFavoritePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    item_name: '',
    rating: '',
    notes: '',
    photo_url: ''
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadFavorite = async () => {
      try {
        const res = await fetch(`${API_URL}/api/favorites/${id}`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.error)

        setFormData({
          item_name: data.item_name || '',
          rating: data.rating || 0,
          notes: data.notes || '',
          photo_url: data.photo_url || ''
        })
      } catch (err) {
        setMessage(err.message)
      }
    }

    loadFavorite()
  }, [id])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/api/favorites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating)
        })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Update failed')

      setMessage('Updated successfully')

      // ✅ IMPORTANT FIX: go back after save
      setTimeout(() => {
        navigate('/favorites')
      }, 800)

    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div className="container">
      <h1>Edit Favorite</h1>

      {message && <p>{message}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="Item name"
        />

        <input
          className="input"
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />

        <textarea
          className="input"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <input
          className="input"
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
        />

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}