import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/userApi';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const { data } = await loginUser({ email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login successful');
        setTimeout(() => navigate('/restaurants'), 800);
        } catch (error) {
        setMessage(error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
        <h1>Login</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
            <div>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default LoginPage;