import { useState, useEffect, type JSX } from "react";
import UserCard from "./UserCard";
import DeleteChatButton from "./DeleteChatButton";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

// la side bar qui affiche les utilisateurs du chat
interface ChatSideBarProps {
    readonly ownerId: number;
}

interface User {
    readonly firstname: string;
    readonly lastname: string;
    readonly avatar: string;
}

// récupérer le contenu du token
export function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export default function ChatSideBar({ ownerId }: ChatSideBarProps): JSX.Element {
    const { token } = useAuth();
    const currentUserId = token ? parseJwt(token).sub : null;
    const isOwner = Number(currentUserId) === ownerId;
    const { chatId } = useParams();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (chatId && token) {
            axios.get(`http://localhost:8080/api/chats/${chatId}/user-list`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res => {
                    console.log("Utilisateur chargé :", res.data);
                    setUsers(res.data);
                })
                .catch(err => console.error("Erreur lors de la récupération des utilisateurs :", err));
        }
    }, [chatId, token]);

    return (
        <aside style={{ width: "20%", padding: "10px", backgroundColor: "white" }}>
            {users.map((user: User, index: number) => (
                <UserCard
                    key={index}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    avatar={user.avatar}
                />
            ))}
            <DeleteChatButton showButton={isOwner} chatId={Number(chatId)} />
        </aside>
    );
}
