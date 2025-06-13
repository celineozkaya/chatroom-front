import type { JSX } from "react";

// les cartes affichant les utilisateurs du chat
interface UserCardProps{
    readonly firstname : string;
    readonly lastname : string;
    readonly avatar: string;
}

export default function UserCard({firstname, lastname, avatar} : UserCardProps) : JSX.Element{

    const backendBaseURL = "http://localhost:8080/uploads/avatars/";
    // avatar ou default si pas de photo
    const avatarUrl = avatar
        ? `${backendBaseURL}${avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(firstname + " " + lastname)}`;

    console.log(avatarUrl)
    return(

            <div style={{display: "flex", alignItems : "center", gap : "20px",padding: "15px", marginBottom :"10px", borderRadius: "20px", border : "1px solid grey"}}>
                <img
                    src={avatarUrl}
                    alt={`avatar...`}
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    />
                <div>{firstname} {lastname}</div>
            </div>

    );

}