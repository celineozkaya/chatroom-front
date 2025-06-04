// src/pages/MesChats.tsx
import React from 'react';
import NavBar from '../components/NavBar';
import MesChatsProprietaire from '../components/MesChatsProprietaire';

const MesChats: React.FC = () => {
    return (
        <>
            <NavBar navbarHeight={30} />
            <div>
                <h1>Mes Chats</h1>
                <MesChatsProprietaire />
            </div>
        </>
    );
};

export default MesChats;
