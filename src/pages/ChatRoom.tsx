// page de l'interface de chatroom
import { type JSX } from "react";
import ChatZone from "../components/ChatZone";
import ChatSideBar from "../components/ChatSideBar";
import { useParams } from "react-router-dom";

// typage ("interface" => pas vrm une classe mais obj) : on definit l'objet qu'on donne a ChatRoom
interface ChatRoomProps{

}


// fonction qui rpz un composant (la page chatroom) qu'on utilise comme une fonction
// les clé sans donner un nom a un objet dont on se blc au final car on appelle juste ses clefs
// (ex : id au lieu de ChatRoomProps chatroomprops puis chatroomprops.id)
// exporter, 
export default function ChatRoom({} : ChatRoomProps) : JSX.Element {
    const { chatId } = useParams<{ chatId: string }>();


    return(
        <div style={{ display: "flex", height: "100%", width: "100%", fontFamily: "sans-serif"}}> {/*display: flex : place les enfants horizontalement, height: 100vh : occupe toute la hauteur de l’écran, fontFamily: "sans-serif" : police du texte*/}
            
            {/* zone de chat (chats + input) */}
            <ChatZone title="Titre du chat"/>

            {/* sidebar pour les utilisateurs connectés */}
            <ChatSideBar/>
        </div>

    );

};