import { useState, type JSX } from "react";
import UserCard from "./UserCard";
import DeleteChatButton from "./DeleteChatButton";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router-dom";

// la side bar qui affiche les utilisateurs du chat
interface ChatSideBarProps{
    readonly ownerId : number;
}

interface User{
    readonly firstname : string;
    readonly lastname : string;
    readonly online : boolean;
}

// données temporaires
const user1 : User = {firstname : "Celine", lastname : "Ozkaya", online : true};
const user2 : User = {firstname : "Alice", lastname : "Bob", online : true};
const user3 : User = {firstname : "Lala", lastname : "Lili", online : false};
const MOCK_USERS : User[] = [user1, user2, user3];

// recuperer le contenu du token 
function parseJwt (token : string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default function ChatSideBar({ownerId} : ChatSideBarProps): JSX.Element{
    const { token } = useAuth();
    const currentUserId = token ? parseJwt(token).sub : null;
    const isOwner = Number(currentUserId) === ownerId;
    const { chatId } = useParams();

    return (
        <aside style={{width: "20%", padding: "10px", backgroundColor : "white"}}>
            {/* si MOCK_USERS est pas null, on itere sur tous les user pour les afficher */}
            {MOCK_USERS && MOCK_USERS.map((user : User) => { 
                return (
                    <UserCard firstname={user.firstname} lastname={user.lastname} online={user.online}/>
                );
            })}
            <DeleteChatButton showButton={isOwner} chatId={Number(chatId)}/>
        </aside>
    );
};