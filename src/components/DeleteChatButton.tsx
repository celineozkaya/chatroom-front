import type { CSSProperties, JSX } from "react";
import styles from '../styles/Button.module.css';


interface DeleteChatButtonProps{
    readonly showButton :boolean;

}



export default function DeleteChatButton({showButton} : DeleteChatButtonProps) : JSX.Element | null {
    if(showButton){

        return (
            <div style={{display : "flex", justifyContent : "center"}}>
                <button type="submit" className={`${styles.button} ${styles.redButton}`}>Supprimer le chat</button>
            </div>
        );
        
    }
    else{
        return null;
    }
}