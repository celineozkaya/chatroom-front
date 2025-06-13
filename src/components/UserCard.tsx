import type { JSX } from "react";

// les cartes affichant les utilisateurs du chat
interface UserCardProps{
    readonly firstname : string;
    readonly lastname : string;
    readonly avatar: string;
}

export default function UserCard({firstname, lastname, avatar} : UserCardProps) : JSX.Element{

    const backendBaseURL = "http://localhost:8080/uploads/avatars/";
    const avatarUrl = avatar
        ? `${backendBaseURL}${avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(firstname + " " + lastname)}`;

    console.log(avatarUrl)
    return(

            // j'ai fait gap:"10px" dans aside mais ca marche pas?
            <div style={{padding: "15px",
            marginBottom :"10px",
            borderRadius: "20px",
            }}>
                <div>{firstname} {lastname}</div>
                <img
                    src={avatarUrl}
                    alt={`avatar...`}
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
            </div>

    );

}