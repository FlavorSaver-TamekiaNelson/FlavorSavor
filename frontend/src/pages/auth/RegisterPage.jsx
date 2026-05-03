import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        setMessage('Registered successfully');
        setEmail('');
        setPassword('');
        } catch (error) {
        setMessage(error.message);
        }
    };

    return (
        <div>
        <h1>Register</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleRegister}>
            <div>
            <label>Email: </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Password: </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>

            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default RegisterPage;