import { useState, type CSSProperties, type JSX, useEffect } from "react";
import style from "../styles/Accueil.module.css";
import axios from "axios";
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // ou autre thème
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


interface CreateChatProps{

}

interface User{
    readonly id : number; 
    readonly firstname : string; 
    readonly lastname : string; 
    readonly email : string; 
    // readonly avatar : string; // c'est une photo
}



const formStyle : CSSProperties = {
    display: "flex", 
    flexDirection: "column",
    gap: "10px", 
    borderRadius : "20px",  
    width : "40%", 
    padding :"26px",
    backgroundColor :"white"
}

const inputStyle : CSSProperties = {
    padding : "10px",
    fontSize : "16px", 
    border : "1px solid lightgrey", 
    borderRadius : "20px", 
    height : "40px",
}

const selectStyle : CSSProperties = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid lightgrey",
    borderRadius: "20px",
    height: "40px",
    lineHeight: "20px",
    appearance: "none", // enlève le style natif
    WebkitAppearance: "none", // safari
    MozAppearance: "none", // firefox
    backgroundColor: "white"
}


export default function CreateChat({} : CreateChatProps) : JSX.Element {
    // pour peupler le select (lister les utilisateurs)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);


    // au chargement du composant, recuperer la liste des utilisateurs
    useEffect(() => {
        getUsers();
    }, []);

    // requete get pour la liste des users
    function getUsers() {
        axios
            .get("http://localhost:8080/api/users")
            .then((res) => {
                // caster la liste de liste en liste de user
                const tempUsers : User[] = res.data.map((user : (number | string)[]) => ({
                    id: user[0] as number,
                    firstname: user[1] as string,
                    lastname: user[2] as string,
                    email: user[3] as string
                }));
                setUsers(tempUsers);
            })
            .catch((err) => console.error(err));
    };

    function createChat(formData : FormData) {
        
    }

    // template pour une option du multiselect
    const userTemplate = (option : User) => {
        return (
            <div className="flex align-items-center">
                <div>{option.firstname} {option.lastname} ({option.email})</div>
            </div>
        );
    };


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems : "center"}}>
            <div style={{fontSize :"26px", padding : "20px"}}>Créez un chat</div>
            <form action={createChat} style={formStyle}>
                <div>Nom du chat*</div> 
                <input type="text" name="name" style={inputStyle} required/>

                <div>Description*</div> 
                <input type="text" name="description" style={inputStyle} required/>

                <div style={{display: "flex", gap : "20px"}}> 
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        Date*
                        <input type="date" style={{...inputStyle, width: "fit-content"}} required/>
                    </div> 
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        Période de validité (en jours)*
                        <input type="number" min="0" style={inputStyle} required/>
                    </div>
                </div>

                <div>Invités*</div> 
                <MultiSelect value={selectedUsers} onChange={(e) => setSelectedUsers(e.value)} options={users} optionLabel="email"
                placeholder="Selectionnez vos invités" itemTemplate={userTemplate} display="chip" className="w-full" />

                <small>*Champs requis.</small>

                <div style={{display : "flex", justifyContent : "center"}}>
                    <button type="submit" className={style.createchat} style={{border : "none"}}>Créer mon chat</button>
                </div>
            </form>
        </div>
            
        
    );
}

// https://medium.com/nerd-for-tech/fetching-api-using-useeffect-hook-in-react-js-7b9b34e427ca
// https://primereact.org/multiselect/
// const userIds = selectedUsers.map(user => user.id);
