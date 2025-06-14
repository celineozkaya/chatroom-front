// src/pages/Accueil.tsx
import React, { type CSSProperties } from 'react';
import MesChatsProprietaire from '../components/MesChatsProprietaire';
import MesChatsInvite from '../components/MesChatsInvite';



// finir le css + pas oublier de remettre les protected routes
const Accueil: React.FC = () => {
    return (
        <div style={{display:"flex", justifyContent : "center"}}>
            {/* <div style={{backgroundColor : "white", borderRadius : "20px", width : "40%", padding : "20px"}}>  */}
                {/* <div style={{fontSize : "22px", padding : "20px"}}>Accueil</div>*/} 
                {/*<div style={{display:"flex", justifyContent : "center", gap :"30px", width : "100%"}}> */} 
                <div style={{width : "100%", padding : "20px"}}>

                        <MesChatsProprietaire />

                </div>

                    <div style={{width : "100%", padding : "20px"}}>
                        <MesChatsInvite />
                    </div>

            {/*</div>*/} 
            {/*</div>*/} 
                    {/* </div> */}
                    </div>
    );
};

export default Accueil;
