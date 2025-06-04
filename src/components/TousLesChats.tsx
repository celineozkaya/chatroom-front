// src/components/TousLesChats.tsx
import React from 'react';
import MesChatsProprietaire from './MesChatsProprietaire';
import MesChatsInvite from './MesChatsInvite';

const TousLesChats: React.FC = () => {
    return (
        <div>
            <MesChatsProprietaire />
            <MesChatsInvite />
        </div>
    );
};

export default TousLesChats;
