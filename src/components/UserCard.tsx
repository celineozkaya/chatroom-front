import type { JSX } from "react";

// les cartes affichant les utilisateurs du chat
interface UserCardProps{
    readonly firstname : string;
    readonly lastname : string;
    readonly avatar: string;
}

export default function UserCard({firstname, lastname, avatar} : UserCardProps) : JSX.Element{
    return(
            // j'ai fait gap:"10px" dans aside mais ca marche pas?
            <div style={{padding: "15px",
            marginBottom :"10px",
            borderRadius: "20px",
            }}>
                <div>{firstname} {lastname}</div>
                <img
                        src={avatar}
                    alt={`avatar...`}
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
            </div>

    );

}