// page de l'interface de chatroom
import React, { type JSX } from "react";
import ChatZone from "../components/ChatZone";
import ChatSideBar from "../components/ChatSideBar";

// typage ("interface" => pas vrm une classe mais obj) : on definit l'objet qu'on donne a ChatRoom
interface ChatRoomProps{
    readonly id : number;

}


// fonction qui rpz un composant (la page chatroom) qu'on utilise comme une fonction
// les clé sans donner un nom a un objet dont on se blc au final car on appelle juste ses clefs
// (ex : id au lieu de ChatRoomProps chatroomprops puis chatroomprops.id)
// exporter, 
export default function ChatRoom({id} : ChatRoomProps) : JSX.Element {
    return(
        <div style={{display: "flex", height: "100%", width: "100%", fontFamily: "sans-serif"}}> {/*display: flex : place les enfants horizontalement, height: 100vh : occupe toute la hauteur de l’écran, fontFamily: "sans-serif" : police du texte*/}
            
            {/* zone de chat (chats + input) */}
            <ChatZone/>

            {/* sidebar pour les utilisateurs connectés */}
            <ChatSideBar id={id}/>
        </div>

    );

};