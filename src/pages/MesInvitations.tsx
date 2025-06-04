// src/pages/MesInvitations.tsx
import React from 'react';
import NavBar from '../components/NavBar';
import MesChatsInvite from '../components/MesChatsInvite';

const MesInvitations: React.FC = () => {
  return (
    <>
      <NavBar navbarHeight={30} />
      <div>
        <h1>Mes Invitations</h1>
        <MesChatsInvite />
      </div>
    </>
  );
};

export default MesInvitations;
