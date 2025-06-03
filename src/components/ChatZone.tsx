import { useState, type JSX } from "react";
import ChatMessage from "./ChatMessage";

interface Message{
    readonly content: string;
    readonly author : string;
}

interface ChatZoneProps{
    readonly title : string; 
    
}


// donnees temporaires tq j'ai pas api
const msg_eux : Message = {content : "MOCK - coucou", author : "MSG_EUX"}
const msg_moi : Message = {content : "MOCK - coucou", author : "MSG_MOI"}
const MOCK_MESSAGES : Message[] = [msg_eux, msg_eux, msg_eux, msg_moi,msg_eux, msg_eux, msg_moi, msg_eux];


export default function ChatZone({title="Titre du chat"}:ChatZoneProps):JSX.Element {
    // partie fonctionnelle du composant 
    const [displayedMessage, setDisplayedMessage] = useState<string>(''); // afficher le message
    const [hovered, setHovered] = useState(false);

    // gere l'envoie des messages
    function sendMessage(formData : FormData) {
        const message = formData.get("message");
        if(message!=null && message!=""){
            setDisplayedMessage(message.toString());
        }
    }

    return(
        <div style={{border : "1px solid lightgrey", borderRadius : "16px", width: "80%", display: "flex", flexDirection:"column", height: "100%", justifyContent: "space-between",backgroundColor : "white"}}>
            {/* titre */}
            <div style={{fontSize : "20px", padding : "20px", textAlign: "center", color:"black"}}>
                {title}
            </div>
            {/* messages */}
            <div style={{ display:"flex", flexDirection:"column", overflowY:"scroll", gap:"16px", padding :"20px"}}>
                {/* <div style={{ border : "1px solid blue"}}>{displayedMessage !== '' && <p>Your message is : {displayedMessage}.</p>}</div> */}
                <ChatMessage content={displayedMessage} author="Celine" alignRight/>
                <ChatMessage content="Coucou" author="Bastian"/>

                {/* si MOCK_MESSAGE est pas null, on itere sur tous les messages pour les afficher */}
                {MOCK_MESSAGES && MOCK_MESSAGES.map((message : Message) => { 
                    return (
                        <ChatMessage content={message.content} author={message.author} alignRight={message.author==="MSG_MOI"}/>
                    );
                })}
            </div>

            {/* input + boutton */}
            <div style={{backgroundColor:"lightgrey", height:"80px", alignContent:"center", padding : "10px"}}>
            <form action={sendMessage} style={{display: "flex", gap: "10px"}}>
                <input type="text" name="message" style={{ border : "none", borderRadius : "10px", width : "80%", height : "30px"}}/>
                <button type="submit" style={{ backgroundColor: hovered ? "#44677B" : "#98C1D9", border : "none",  padding : "5px 10px", borderRadius : "10px"}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>Envoyer</button>
            </form>
            </div>
        </div>

    );
};


//git push -u origin ChatRoom