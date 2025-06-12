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
    readonly description : string;    
}


export default function ChatZone({title, description} : ChatZoneProps) : JSX.Element {

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
            <div style={{display: "flex", flexDirection:"column"}}>
                <div style={{fontSize : "24px", padding : "18px", textAlign: "center", color:"black", fontWeight : "bold"}}>{title}</div>
                <div style={{textAlign: "center",color:"darkgrey"}}>{description}</div>
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