import { useState, type JSX, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import styles from '../styles/Button.module.css';
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


interface Message{
    readonly user: string;
    readonly mail : string;
    readonly message : string;
    readonly timestamp : string; 
}

interface ChatZoneProps{
    readonly title : string;    
}


export default function ChatZone({title="Titre du chat"} : ChatZoneProps) : JSX.Element {

    const { user, token } = useAuth();
    console.log("user =", user);

    const { chatId } = useParams();
    const id = chatId ? Number(chatId) : 0;

    // partie fonctionnelle du composant 
    const [messages, setMessages] = useState<Message[]>([]);
    const ws = useRef<WebSocket | null>(null);
    
    useEffect(() => {
        const websocket = new WebSocket(`ws://localhost:8080/salon/${id}?token=${token}`);
        ws.current = websocket;

        websocket.onopen = () => {
            console.log('WebSocket is connected');
        };

        websocket.onmessage = (evt) => {
            const message: Message = JSON.parse(evt.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        websocket.onclose = () => {
            console.log('WebSocket is closed');
        };

        return () => {
            websocket.close();
        };
    }, [id]);

    function sendMessage(formData: FormData) {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const content = formData.get("message");
            if (content && user) {
                ws.current.send(JSON.stringify({
                    user: `${user.firstname} ${user.lastname}`,
                    mail: user.email,
                    message: content,
                    timestamp: new Date().toISOString()
                }));
            }
        }
    }

    return(
        <div style={{border : "1px solid lightgrey",  width: "80%", display: "flex", flexDirection:"column", height: "100%", justifyContent: "space-between",backgroundColor : "white"}}>
            {/* titre */}
            <div style={{fontSize : "24px", padding : "20px", textAlign: "center", color:"black", fontWeight : "bold"}}>
                {title}
            </div>
            {/* messages */}
            <div style={{ display:"flex", flexDirection:"column", overflowY:"scroll", gap:"16px", padding :"20px"}}>
                {messages.map((m, i) => (
                    <ChatMessage key={i} content={m.message} author={m.user} date={m.timestamp} alignRight={m.user === `${user?.firstname} ${user?.lastname}`}/>
                ))}
            </div>

            {/* input + boutton */}
            <div style={{backgroundColor:"#5b748e", height:"80px", alignContent:"center", padding : "10px"}}>
            <form action={sendMessage} style={{display: "flex", gap: "10px"}}>
                <input type="text" name="message" style={{padding : "10px", fontSize : "16px", border : "none", borderRadius : "20px", width : "80%", height : "40px"}}/>
                <button type="submit" className={styles.button} >Envoyer</button>
            </form>
            </div>
        </div>

    );
};

// // src/components/ChatZone.tsx
// import { useEffect, useRef, useState } from "react";

// interface ChatZoneProps {
//     id: number; // ID du salon
//     username: string;
//     mail: string;
// }

// interface Message {
//     user: string;
//     mail: string;
//     message: string;
//     timestamp?: string;
// }

// export default function ChatZone({ id, username, mail }: ChatZoneProps) {
//     const [messages, setMessages] = useState<string[]>([]);
//     const [inputValue, setInputValue] = useState("");
//     const ws = useRef<WebSocket | null>(null);

//     useEffect(() => {
//         const socket = new WebSocket(`ws://localhost:8080/salon/${id}`);
//         ws.current = socket;

//         socket.onopen = () => {
//             console.log("Connexion WebSocket ouverte.");
//         };

//         socket.onmessage = (event) => {
//             setMessages((prev) => [...prev, event.data]);
//         };

//         socket.onclose = () => {
//             console.log("Connexion WebSocket fermée.");
//         };

//         return () => {
//             socket.close();
//         };
//     }, [id]);

//     const sendMessage = () => {
//         if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//             const msg: Message = {
//                 user: username,
//                 mail: mail,
//                 message: inputValue,
//             };
//             ws.current.send(JSON.stringify(msg));
//             setInputValue("");
//         }
//     };

//     return (
//         <div style={{ backgroundColor: "lightblue", width: "80%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//             {/* Affichage des messages */}
//             <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//                 {messages.map((msg, index) => (
//                     <div key={index} style={{ backgroundColor: "#cce", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "5px" }}>
//                         {msg}
//                     </div>
//                 ))}
//             </div>

//             {/* Input de message */}
//             <div style={{ padding: "1rem", backgroundColor: "lightgrey", display: "flex", gap: "0.5rem" }}>
//                 <input
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     style={{ flex: 1, padding: "0.5rem" }}
//                 />
//                 <button onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>Envoyer</button>
//             </div>
//         </div>
//     );
// }


//<ChatMessage content={displayedMessage} author="Celine" date="Aujourd'hui à 12h00" alignRight/>
//                <ChatMessage content="Coucou" author="Bastian" date="Aujourd'hui à 12h00"/>
//
//                {/* si MOCK_MESSAGE est pas null, on itere sur tous les messages pour les afficher */}
//                {MOCK_MESSAGES && MOCK_MESSAGES.map((message : Message) => { 
//                    return (
//                        <ChatMessage content={message.content} author={message.author} date={message.date} alignRight={message.author==="MSG_MOI"}/>
//                    );
//                })}