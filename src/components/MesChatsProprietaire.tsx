// src/components/MesChatsProprietaire.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/Button.module.css';

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
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Link className= {styles.button} to="/creer-un-chat" >Créer un nouveau chat</Link>
                </div>
            </div>

        </div>
            
    );
};

export default MesChatsProprietaire;
