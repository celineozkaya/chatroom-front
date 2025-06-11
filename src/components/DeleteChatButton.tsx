import styles from '../styles/Button.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { JSX } from 'react';


interface DeleteChatButtonProps{
    readonly showButton :boolean;
    readonly chatId : number;
}


export default function DeleteChatButton({showButton, chatId} : DeleteChatButtonProps) : JSX.Element | null {
    
    const navigate = useNavigate();

    function deleteChat(){
        axios.post(`http://localhost:8080/api/chats/${chatId}/delete`, null, {headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(res => {
                // console.log("Chat supprimé :", res.data);
                navigate("/mes-chats"); // redirection vers /mes-chats
            })
            .catch(err => {
                if (err.response) {
                    alert("Erreur : " + err.response.data);
                }
            });
    };
    
    if(showButton){
        return (
            <div style={{display : "flex", justifyContent : "center"}}>
                <button type="button" onClick={deleteChat} className={`${styles.button} ${styles.redButton}`}>Supprimer le chat</button>
            </div>
        );
        
    }
    else{
        return null;
    }
}