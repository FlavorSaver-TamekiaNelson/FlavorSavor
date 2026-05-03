import { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login successful');
        } catch (error) {
        setMessage(error.message);
        }
    };

    return (
        <div>
        <h1>Login</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleLogin}>
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

            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default LoginPage;