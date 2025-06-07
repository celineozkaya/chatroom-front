import type { CSSProperties, JSX } from "react";
import style from "../styles/Accueil.module.css"

interface CreateChatProps{

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
    height : "20px",
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
    function createChat(formData : FormData) {
        
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems : "center"}}>
            <div style={{fontSize :"26px", padding : "20px"}}>Créez un chat</div>
            <form action={createChat} style={formStyle}>
                <div>Nom du chat</div> 
                <input type="text" name="name" style={inputStyle}/>

                <div>Description</div> 
                <input type="text" name="description" style={inputStyle}/>

                <div style={{display: "flex", gap : "20px"}}> 
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        Date
                        <input type="date" style={{...inputStyle, width: "fit-content"}}/>
                    </div> 
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        Période de validité (en jours)
                        <input type="number" min="0" style={inputStyle}/>
                    </div>
                </div>

                <div>Invités</div> 
                <select style={selectStyle} multiple>

                </select>
                <div style={{display : "flex", justifyContent : "center"}}>
                    <button type="submit" className={style.createchat} style={{border : "none"}}>Créer mon chat</button>
                </div>
            </form>
        </div>
            
        
    );
}