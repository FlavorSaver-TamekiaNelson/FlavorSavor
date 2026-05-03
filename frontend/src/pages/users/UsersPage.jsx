import { useEffect, useState } from 'react'
import PageContainer from '@/components/layout/PageContainer'

const API_URL =
    import.meta.env.VITE_API_URL ||
    'https://flavorsavor-api-hudbbdgzbpajcwf3.centralus-01.azurewebsites.net'

export default function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${API_URL}/api/users`)
            const data = await res.json()
            setUsers(data)
        }

        load()
    }, [])

    return (
        <PageContainer>

            <h1>Users</h1>

            <div className="grid">

                {users.map(u => (
                    <div className="card" key={u.id}>
                        {u.email}
                    </div>
                ))}

            </div>

        </PageContainer>
    )
}