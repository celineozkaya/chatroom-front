import type { JSX } from "react";

// les cartes affichant les utilisateurs du chat
interface UserCardProps{
    readonly firstname : string;
    readonly lastname : string;
    readonly online : boolean;
}

export default function UserCard({firstname, lastname, online} : UserCardProps) : JSX.Element{
    return(
            // j'ai fait gap:"10px" dans aside mais ca marche pas?
            <div style={{padding: "15px",
            marginBottom :"10px",
            borderRadius: "20px",
            backgroundColor: online ? "#97E283" : "#FDFDFD",
            color: online ? "#1E3321" : "#3D3D3D",
            fontWeight: online ? "bold" : "normal",
            }}>
                <div>{firstname} {lastname}</div>
                <div style={{fontSize : "12px", fontWeight : "lighter"}}>{online? "En ligne" : "Hors ligne"}</div>
            </div>
    );

}