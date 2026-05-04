import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/userApi';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        await registerUser({ email, password });
        setMessage('Registered successfully');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/login'), 800);
        } catch (error) {
        setMessage(error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
        <h1>Register</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleRegister}>
            <div>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default RegisterPage;