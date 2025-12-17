import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="nav-brand">
                    ReactProject
                </Link>
                <div className="nav-links">
                    {isAuthenticated && (
                        <Link
                            to="/"
                            className="btn btn-secondary"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Home
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Link to="/add" className="btn btn-primary">
                            Add New Post
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ marginLeft: '1rem', padding: '0.5rem', display: 'flex', alignItems: 'center' }} title="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
