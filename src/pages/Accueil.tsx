// src/pages/Accueil.tsx
import React, { type CSSProperties } from 'react';
import MesChatsProprietaire from '../components/MesChatsProprietaire';
import MesChatsInvite from '../components/MesChatsInvite';
import { Link } from 'react-router-dom';
import styles from '../styles/Button.module.css';


// finir le css + pas oublier de remettre les protected routes
const Accueil: React.FC = () => {
    return (
        <div style={{display:"flex", flexDirection :"column", alignItems : "center"}}>
            <div style={{display:"flex", flexDirection :"column", alignItems : "center", padding:"20px"}}>
                <div>Accueil</div>
                <div style={{display:"flex", alignItems : "center", gap :"30px"}}> 
                    <div style={{backgroundColor : "white", borderRadius : "20px", width : "100%"}}>
                        <MesChatsProprietaire />
                        <Link className= {styles.button} to="/creer-un-chat" >Créer un chat</Link>
                    </div>
                    <div style={{backgroundColor : "white", borderRadius : "20px", width : "100%"}}>
                        <MesChatsInvite />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Accueil;
