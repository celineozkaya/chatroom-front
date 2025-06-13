import { useState, type CSSProperties, type JSX, useEffect } from "react";
import style from "../styles/Button.module.css";
import axios from "axios";
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // ou autre thème
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useAuth } from "../auth/AuthContext";
import { parseJwt }from "../components/ChatSideBar"


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

// recuperer la date actuelle
function getCurrentDateTime() : string {
    const now = new Date();
    now.setSeconds(0, 0); // sans secondes et millisecondes
    return now.toISOString().slice(0, 16); 
};

// convertir la date au format sql
function toSQLTimestamp(dateTime: string) : string {
    return dateTime + ':00'; // donne le format YYYY-MM-DD HH:MM:00
};

export default function CreateChat({} : CreateChatProps) : JSX.Element {
    // pour peupler le select (lister les utilisateurs)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { token } = useAuth();
    const currentUserId = token ? parseJwt(token).sub : null;

    // au chargement du composant, recuperer la liste des utilisateurs
    useEffect(() => {
        if(currentUserId){
            getUsers();
        }
    }, []);

    // requete get pour la liste des users (select)
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
                // tous les utilisateurs sauf currentUser
                const filteredUsers = tempUsers.filter(user => user.id !== Number(currentUserId));
                setUsers(filteredUsers);
            })
            .catch((err) => console.error(err));
    };

    // action a l'envoie du formulaire
    function createChat(formData : FormData) {

        const body = {
            title : formData.get("title"),
            description :formData.get("description"),
            date : toSQLTimestamp(formData.get("date")!.toString()),
            validityPeriod : formData.get("validityperiod")
        }
        
        // creer le chat sans invités
        axios
        .post("http://localhost:8080/api/chats/create", JSON.stringify(body), {headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            // ajouter les invités 
            .then((res) => {
                console.log("Chat créé :", res.data.id);
                const chatId = res.data.id;
            
                if (!chatId) {
                    console.error("Chat ID manquant dans la réponse");
                    return;
                }
            
                setSuccessMessage("Le chat a été créé !");

                // envoyer invitation a chaque utilisateur
                selectedUsers.forEach((user) => {
                    const invitationBody = {
                        userId: user.id
                    };

                    axios.post(`http://localhost:8080/api/chats/${chatId}/invite`,
                        JSON.stringify(invitationBody),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        })
                        .then((inviteRes) => {
                            console.log({inviteRes});
                            console.log(`Utilisateur ${user.email} invité avec succès`);
                        })
                        .catch((inviteErr) => {
                            console.error(`Erreur lors de l'invitation de ${user.email}`, inviteErr);
                        });
                });
            })
            .catch((err) => console.error(err));
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
                <input type="text" name="title" style={inputStyle} required/>

                <div>Description*</div> 
                <input type="text" name="description" style={inputStyle} required/>

                <div style={{display: "flex", gap : "20px"}}> 
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        Date*
                        <input type="datetime-local" name="date" min={getCurrentDateTime()} style={{...inputStyle, width: "fit-content"}} required/>
                    </div> 
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        Période de validité (en jours)*
                        <input type="number" name="validityperiod" min="0" style={inputStyle} required/>
                    </div>
                </div>

                <div>Invités*</div> 
                <MultiSelect value={selectedUsers} name="guests" onChange={(e) => setSelectedUsers(e.value)} options={users} optionLabel="email"
                placeholder="Selectionnez vos invités" itemTemplate={userTemplate} display="chip" className="w-full" />

                <small>*Champs requis.</small>

                <div style={{display : "flex", justifyContent : "center"}}>
                    <button type="submit" className={style.button}>Créer mon chat</button>
                </div>
                {successMessage && (
                    <div style={{ color: "green", marginTop: "10px", textAlign: "center" }}>
                        {successMessage}
                    </div>
                )}

            </form>
        </div>
            
        
    );
}

// https://medium.com/nerd-for-tech/fetching-api-using-useeffect-hook-in-react-js-7b9b34e427ca
// https://primereact.org/multiselect/