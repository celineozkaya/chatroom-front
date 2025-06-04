// src/pages/Accueil.tsx
import React from 'react';
import TousLesChats from '../components/TousLesChats';

const Accueil: React.FC = () => {
    return (
        <>
            <div>
                <h1>Accueil</h1>
                <TousLesChats />
            </div>
        </>
    );
};

export default Accueil;
