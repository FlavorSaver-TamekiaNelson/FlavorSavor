import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import PageContainer from '@/components/layout/PageContainer'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const API_URL = import.meta.env.VITE_API_URL || 'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

export default function EditRestaurantPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    cuisine: '',
    location: ''
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const res = await fetch(`${API_URL}/api/restaurants/${id}`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Failed to load restaurant')

        setForm({
          name: data.name || '',
          cuisine: data.cuisine || '',
          location: data.location || ''
        })
      } catch (err) {
        setMessage(err.message)
      }
    }

    loadRestaurant()
  }, [id])

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/api/restaurants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Update failed')

      setMessage('Restaurant updated successfully')

      setTimeout(() => {
        navigate('/restaurants')
      }, 800)

    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <PageContainer>

      <h1>Edit Restaurant</h1>

      {message && <p>{message}</p>}

      <form className="form" onSubmit={handleSubmit}>

        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Restaurant name"
        />

        <Input
          name="cuisine"
          value={form.cuisine}
          onChange={handleChange}
          placeholder="Cuisine"
        />

        <Input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <Button type="submit">
          Save Changes
        </Button>

      </form>

    </PageContainer>
  )
}