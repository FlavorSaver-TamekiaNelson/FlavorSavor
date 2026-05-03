import { useEffect, useState } from 'react'
import PageContainer from '@/components/layout/PageContainer'

export default function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const load = async () => {
            const res = await fetch('http://localhost:5001/api/users')
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