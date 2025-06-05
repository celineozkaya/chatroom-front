// src/components/NavBar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface NavBarProps {
    navbarHeight: number;
}

const NavBar: React.FC<NavBarProps> = ({ navbarHeight }) => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige après déconnexion
    };

    return (
        <nav
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1px solid blue',
                width: '100%',
                height: `${navbarHeight}px`,
                padding: '0 1rem'
            }}
        >
            {token ? (
                <>
                    <Link to="/">Accueil</Link>
                    <Link to="/chatroom">Chatroom</Link>
                    <Link to="/mes-chats">Mes Chats</Link>
                    <Link to="/mes-invitations">Mes Invitations</Link>
                    <button onClick={handleLogout}>Se déconnecter</button>
                </>
            ) : (
                <Link to="/login">Se connecter</Link>
            )}
        </nav>
    );
};

export default NavBar;
