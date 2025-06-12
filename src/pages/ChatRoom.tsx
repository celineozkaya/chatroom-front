// page de l'interface de chatroom
import { useState, type JSX, useEffect } from "react";
import ChatZone from "../components/ChatZone";
import ChatSideBar from "../components/ChatSideBar";
import { useParams } from "react-router-dom";
import axios from "axios";

// typage ("interface" => pas vrm une classe mais obj) : on definit l'objet qu'on donne a ChatRoom
interface ChatRoomProps{

}


// fonction qui rpz un composant (la page chatroom) qu'on utilise comme une fonction
// les clé sans donner un nom a un objet dont on se blc au final car on appelle juste ses clefs
// (ex : id au lieu de ChatRoomProps chatroomprops puis chatroomprops.id)
// exporter, 
export default function ChatRoom({} : ChatRoomProps) : JSX.Element {
    const { chatId } = useParams<{ chatId: string }>();
    const [ownerId, setOwnerId] = useState<number>(0);
    const [title, setTitle] = useState<string>("Titre du chat");
    const [description, setDescription] = useState<string>("Description du chat");

    useEffect(() => {
        if (chatId) {
            getChatOwner();
            getChatInfo();
        }
    }, [chatId]);

    function getChatOwner() {
        axios
            .get(`http://localhost:8080/api/chats/${chatId}/owner`)
            .then((res) => {
                
                setOwnerId(res.data.usersId);

            })
            .catch((err) => console.error(err));
    };

    // recuperere le titre du chat
    function getChatInfo() {
        axios
            .get(`http://localhost:8080/api/chats/${chatId}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
            })
            .catch((err) => console.error(err));
    }

    return(
        <div style={{ display: "flex", height: "100%", width: "100%", fontFamily: "sans-serif"}}> {/*display: flex : place les enfants horizontalement, height: 100vh : occupe toute la hauteur de l’écran, fontFamily: "sans-serif" : police du texte*/}
            
            {/* zone de chat (chats + input) */}
            <ChatZone title={title} description={description}/>

            {/* sidebar pour les utilisateurs connectés */}
            <ChatSideBar ownerId={ownerId}/>
        </div>

    );

};

// recuperer l'id de l'owner du chat
//  aligner l’authentification front / back=> voir avec sacha ce qu'il avait fait, on dirait qu'il fait les deux :
//soit tout passe par token jwt (et backend doit verif token),
// soit tout passe par session http avec cookie ( et  axios doit faire withCredentials: true).