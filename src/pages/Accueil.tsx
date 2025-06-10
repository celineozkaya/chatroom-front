// src/pages/Accueil.tsx
import React, { type CSSProperties } from 'react';
import MesChatsProprietaire from '../components/MesChatsProprietaire';
import MesChatsInvite from '../components/MesChatsInvite';
import { Link } from 'react-router-dom';
import styles from '../styles/Button.module.css';



const Accueil: React.FC = () => {
    return (
        <>
            <div style={{display:"flex", flexDirection :"column"}}>
                <div>Accueil</div>
                <MesChatsProprietaire />
                <Link className= {styles.button} to="/creer-un-chat" >Créer un chat</Link>
                <MesChatsInvite />
            </div>
        </>
    );
};

export default Accueil;
