import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '@/components/layout/PageContainer'
import StarRating from '@/components/ui/StarRating'

const API_URL =
    import.meta.env.VITE_API_URL ||
    'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

export default function FavoritesPage() {
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    const [minRating, setMinRating] = useState(0)
    const [sort, setSort] = useState('newest')
    const [selectedTags, setSelectedTags] = useState([])

    const loadFavorites = async () => {
        try {
        const res = await fetch(`${API_URL}/api/favorites/details/all`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load')
        setItems(data)
        } catch (err) {
        console.error(err)
        }
    }

    useEffect(() => {
        loadFavorites()
    }, [])

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    const allTags = useMemo(() => {
        const set = new Set()
        items.forEach(i => {
        (i.tags || []).forEach(tag => set.add(tag))
        })
        return Array.from(set)
    }, [items])

    const filtered = useMemo(() => {
        let result = [...items]

        if (search.trim()) {
        const q = search.toLowerCase()
        result = result.filter(f =>
            (f.item_name || '').toLowerCase().includes(q) ||
            (f.restaurant_name || '').toLowerCase().includes(q)
        )
        }

        if (minRating > 0) {
        result = result.filter(f => Number(f.rating || 0) >= minRating)
        }

        if (selectedTags.length > 0) {
        result = result.filter(f =>
            selectedTags.every(tag => f.tags?.includes(tag))
        )
        }

        switch (sort) {
        case 'rating_high':
            result.sort((a, b) => b.rating - a.rating)
            break
        case 'rating_low':
            result.sort((a, b) => a.rating - b.rating)
            break
        case 'newest':
        default:
            result.sort((a, b) => b.id - a.id)
        }

        return result
    }, [items, search, minRating, sort, selectedTags])

    const handleDelete = async (id) => {
        try {
        const res = await fetch(`${API_URL}/api/favorites/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) throw new Error('Delete failed')
        setItems(prev => prev.filter(i => i.id !== id))
        } catch (err) {
        console.error(err)
        }
    }

    return (
        <PageContainer>
        <h1>Favorites</h1>

        <div className="toolbar">
            <input
            className="input"
            placeholder="Search favorites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <select
            className="input"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            >
            <option value={0}>All ratings</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5</option>
            </select>
            <select
            className="input"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            >
            <option value="newest">Newest</option>
            <option value="rating_high">Rating ↑</option>
            <option value="rating_low">Rating ↓</option>
            </select>
            <Link className="btn" to="/favorites/add">Add</Link>
        </div>

        <div className="toolbar-tags">
            {allTags.map(tag => (
            <button
                key={tag}
                className={selectedTags.includes(tag) ? 'tag active' : 'tag'}
                onClick={() => toggleTag(tag)}
            >
                {tag}
            </button>
            ))}
            {selectedTags.length > 0 && (
            <button className="tag clear" onClick={() => setSelectedTags([])}>
                Clear
            </button>
            )}
        </div>

        <div className="grid">
            {filtered.map(f => (
            <div className="card" key={f.id}>
                {f.photo_url && (
                <img
                    src={f.photo_url}
                    alt={f.item_name}
                    style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
                />
                )}
                <strong>{f.item_name}</strong>
                <div>{f.restaurant_name}</div>
                <StarRating value={Number(f.rating)} />
                {f.notes && (
                <p style={{ marginTop: 6, fontSize: '0.9rem', color: '#555' }}>
                    {f.notes}
                </p>
                )}
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {f.tags?.map(tag => (
                    <span key={tag} className="tag small">{tag}</span>
                ))}
                </div>
                <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                <Link to={`/favorites/${f.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
                </div>
            </div>
            ))}
        </div>
        </PageContainer>
    )
}