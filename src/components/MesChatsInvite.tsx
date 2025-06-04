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
            <h2>Chats où je suis invité</h2>
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
