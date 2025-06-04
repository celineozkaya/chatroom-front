// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
    navbarHeight: number;
}

const NavBar: React.FC<NavBarProps> = ({ navbarHeight }) => {
    return (
        <nav style={{ display: 'flex', gap: '16px', border: "1px solid blue", width: "100%", height: `${navbarHeight}px` }}>
            <Link to="/">Accueil</Link>
            <Link to="/login">Login</Link>
            <Link to="/chatroom">Chatroom</Link>
            <Link to="/mes-chats">Mes Chats</Link>
            <Link to="/mes-invitations">Mes Invitations</Link>
        </nav>
    );
};

export default NavBar;
