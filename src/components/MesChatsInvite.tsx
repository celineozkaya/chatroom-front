// src/components/MesChatsInvite.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Chat {
    id: number;
    name: string;
}

const MesChatsInvite: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);

    // quand je charge MesChatsInvite, j'execute ceci qui recupere les chats où je suis invité
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get<Chat[]>('http://localhost:8080/api/chats/listchatinvited');
                setChats(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des chats', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div>
            <div>Mes chats (invité)</div>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>
                        <Link to={`/chat/${chat.id}`}>{chat.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MesChatsInvite;
