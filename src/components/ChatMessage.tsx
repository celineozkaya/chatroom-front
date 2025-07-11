import type { JSX } from "react";

interface ChatMessageProps{
    readonly content : string;
    readonly author : string;
    readonly date : string;
    readonly alignRight? : boolean; // pour alignement à droite de mes messages et a gauche ceux des autres
}

export default function ChatMessage({content, author, date, alignRight=false} : ChatMessageProps) : JSX.Element | null{
    // pas d'envoie de message vide ou avec seulement des espaces
    if (!content.trim()){
        return null;
    }

    return (
        <div style={{display : "flex", justifyContent : alignRight ? "flex-end" : "flex-start"}}>
            <div style={{display : "flex", flexDirection: "column", width :"fit-content", minWidth : "30%", maxWidth : "75%", backgroundColor: alignRight?"#98C1D9":"white", padding : "16px", borderRadius : "20px", gap : "10px", border : alignRight?"":"solid 2px #3D5A80"}}>
                <div style={{fontWeight : "bold"}}>{author}</div>
                <div>{content}</div>
                <small>{new Date(date).toLocaleString()}</small>
            </div>
        </div>
    );
}