import type { JSX } from "react";
import UserCard from "./UserCard";

// la side bar qui affiche les utilisateurs du chat
interface ChatSideBarProps{
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

export default function ChatSideBar({} : ChatSideBarProps): JSX.Element{
    return (
        <aside style={{border : "1px solid lightgrey", borderRadius : "16px" ,width: "20%", padding: "10px", backgroundColor : "white"}}>
            {/* si MOCK_USERS est pas null, on itere sur tous les user pour les afficher */}
            {MOCK_USERS && MOCK_USERS.map((user : User) => { 
                return (
                    <UserCard firstname={user.firstname} lastname={user.lastname} online={user.online}/>
                );
            })}
            
        </aside>
    );
};