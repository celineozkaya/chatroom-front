// src/components/MesChatsProprietaire.tsx
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

const MesChatsProprietaire: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                // Récupérer le token depuis le localStorage
                const token = localStorage.getItem('token');

                // Configurer Axios pour inclure le token dans les en-têtes
                const response = await axios.get<Chat[]>('http://localhost:8080/api/chats/listchatowned', {
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
        <div>
            <div>Mes chats (propriétaire)</div>
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

export default MesChatsProprietaire;
