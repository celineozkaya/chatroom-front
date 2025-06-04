//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Crée ce fichier
//import Home from './pages/home';   // Optionnel : ou garde ton contenu de démo
import ChatRoom from './pages/ChatRoom';
import MesChats from './components/MesChatsProprietaire.tsx';
import MesInvitations from './components/MesChatsInvite.tsx';
import Accueil from "./pages/Accueil.tsx";
import NavBar from "./components/NavBar.tsx";
//import NavBar from './components/NavBar';

const NAVBAR_HEIGHT=30;

function App() {
    const test = `calc(100% - ${NAVBAR_HEIGHT}px)`;
    console.log(test);
    return (
        <>
            {/*<nav style={{ display:'flex', gap:'16px', border : "1px solid blue", width:"100%",  height:`${NAVBAR_HEIGHT}px`}}>*/}
            {/*    <Link to="/">Accueil</Link>*/}
            {/*    <Link to="/login">Login</Link>*/}
            {/*    <Link to="/chatroom">Chatroom</Link>*/}
            {/*    <Link to="/mes-chats">Mes Chats</Link>*/}
            {/*    <Link to="/mes-invitations">Mes Invitations</Link>*/}
            {/*</nav>*/}
            <NavBar navbarHeight={30} />

            <div id="mainContent" style={{width : "100%", height:`calc(100% - ${NAVBAR_HEIGHT}px)`}}>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chatroom" element={<ChatRoom id={2} />} />
                    <Route path="/mes-chats" element={<MesChats />} />
                    <Route path="/mes-invitations" element={<MesInvitations />} />
                </Routes>

            </div>

        </>
    );
}

export default App
