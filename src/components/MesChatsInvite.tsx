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
        <div style={{display:"flex",flexDirection : "column", alignItems : "center", padding : "20px"}}>
            <div style={{display:"flex",flexDirection : "column", justifyContent : "center", gap :"30px", width : "80%", padding : "20px", backgroundColor : "white", borderRadius : "20px"}}> 
                <div style = {{fontSize : "20px", textAlign : "center"}}>Mes chats</div>
                <ul style={{listStyleType: "none"}}>
                    {chats.map(chat => (
                        <li key={chat.id} style={{ marginBottom: "10px" }}>
                            <Link to={`/chat/${chat.id}`} style={{
                                textDecoration: "none",
                                color: "#001F3F",
                                padding: "10px",
                                border: "1px solid #001F3F",
                                borderRadius: "8px",
                                display: "inline-block",
                            }}
                            onMouseOver={e => {
                                (e.target as HTMLElement).style.backgroundColor = "#001F3F";
                                (e.target as HTMLElement).style.color = "white";
                            }}
                            onMouseOut={e => {
                                (e.target as HTMLElement).style.backgroundColor = "transparent";
                                (e.target as HTMLElement).style.color = "#001F3F";
                            }}>
                                {chat.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MesChatsInvite;
