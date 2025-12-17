import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Hint: Password is <strong>admin***</strong>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
