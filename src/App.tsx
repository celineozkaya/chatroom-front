//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login'; // Crée ce fichier
import Home from './pages/home';   // Optionnel : ou garde ton contenu de démo

function App() {
    return (
        <>
            <nav style={{ padding: '1rem' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>Accueil</Link>
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App
