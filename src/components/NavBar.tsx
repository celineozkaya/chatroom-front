import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from '../styles/Navbar.module.css';

interface NavBarProps {
    navbarHeight: number;
}

const NavBar: React.FC<NavBarProps> = ({ navbarHeight }) => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={styles.nav} style={{ height: `${navbarHeight}px` }}>
            {token ? (
                <>
                    <Link to="/" className={styles.link}>Accueil</Link>
                    <Link to="/mes-chats" className={styles.link}>Mes Chats</Link>
                    <Link to="/mes-invitations" className={styles.link}>Mes Invitations</Link>
                    <button onClick={handleLogout} className={styles.button}>Se déconnecter</button>
                </>
            ) : (
                <Link to="/login" className={styles.link}>Se connecter</Link>
            )}
        </nav>
    );
};

export default NavBar;
