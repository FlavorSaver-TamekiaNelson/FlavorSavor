import { useEffect, useState } from 'react'

export function useRestaurantFilters(restaurants) {
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('all')
  const [sort, setSort] = useState('az')
  const [minRating, setMinRating] = useState(0)

  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    let result = [...restaurants]

    if (search.trim()) {
      result = result.filter(r =>
        r.name?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (cuisine !== 'all') {
      result = result.filter(r => r.cuisine === cuisine)
    }

    if (minRating > 0) {
      result = result.filter(r => Number(r.rating || 0) >= minRating)
    }

    if (sort === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sort === 'za') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (sort === 'rating-high') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    if (sort === 'rating-low') {
      result.sort((a, b) => (a.rating || 0) - (b.rating || 0))
    }

    if (sort === 'location') {
      result.sort((a, b) =>
        (a.location || '').localeCompare(b.location || '')
      )
    }

    setFiltered(result)
  }, [restaurants, search, cuisine, sort, minRating])

  return {
    search,
    setSearch,
    cuisine,
    setCuisine,
    sort,
    setSort,
    minRating,
    setMinRating,
    filtered
  }
}