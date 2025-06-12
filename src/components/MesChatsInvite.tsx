// src/components/MesChatsInvite.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Chat {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly date: string;
    readonly validityPeriod: number;
}

const MesChatsInvite: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);

    // quand je charge MesChatsInvite, j'execute ceci qui recupere les chats où je suis invité
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<Chat[]>('http://localhost:8080/api/chats/listchatinvited',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setChats(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des chats', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div >
            <div>Mes chats (invité)</div>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>
                        <Link to={`/chat/${chat.id}`}>{chat.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MesChatsInvite;
