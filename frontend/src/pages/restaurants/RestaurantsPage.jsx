import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '@/components/layout/PageContainer'

const API_URL = import.meta.env.VITE_API_URL || 'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

export default function RestaurantsPage() {
    const [items, setItems] = useState([])

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('newest')
    const [cuisine, setCuisine] = useState('all')

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${API_URL}/api/restaurants`)
            const data = await res.json()
            setItems(data)
        }

        load()
    }, [])

    const filtered = useMemo(() => {
        let result = [...items]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(r =>
                (r.name || '').toLowerCase().includes(q) ||
                (r.cuisine || '').toLowerCase().includes(q) ||
                (r.location || '').toLowerCase().includes(q)
            )
        }

        if (cuisine !== 'all') {
            result = result.filter(r => r.cuisine === cuisine)
        }

        switch (sort) {
            case 'name_asc':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'name_desc':
                result.sort((a, b) => b.name.localeCompare(a.name))
                break
            default:
                result.sort((a, b) => b.id - a.id)
        }

        return result
    }, [items, search, sort, cuisine])

    const handleDelete = async (id) => {
        await fetch(`${API_URL}/api/restaurants/${id}`, {
        method: 'DELETE'
        })

        setItems(prev => prev.filter(r => r.id !== id))
    }

    return (
        <PageContainer>

            <h1>Restaurants</h1>

            <div className="toolbar">

                <input
                    className="input"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="input"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                >
                    <option value="all">All cuisines</option>
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Mexican">Mexican</option>
                </select>

                <select
                    className="input"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="name_asc">Name ↑</option>
                    <option value="name_desc">Name ↓</option>
                </select>

                <Link className="btn" to="/restaurants/add">
                    Add
                </Link>

            </div>

            <div className="grid">

                {filtered.map(r => (
                    <div className="card" key={r.id}>
                        <strong>{r.name}</strong>
                        <div>{r.cuisine}</div>
                        <div>{r.location}</div>

                        <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                            <Link to={`/restaurants/${r.id}/edit`}>Edit</Link>
                            <button onClick={() => handleDelete(r.id)}>Delete</button>
                        </div>
                    </div>
                ))}

            </div>

        </PageContainer>
    )
}