import { useEffect, useState } from 'react';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch users');
            }

            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
        };

        loadUsers();
    }, []);

    return (
        <div>
        <h1>Users</h1>

        {error && <p>{error}</p>}

        {users.length === 0 ? (
            <p>No users found.</p>
        ) : (
            <ul>
            {users.map((user) => (
                <li key={user.id}>{user.email}</li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default UsersPage;