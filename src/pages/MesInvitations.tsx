// src/pages/MesInvitations.tsx
import React from 'react';
import NavBar from '../components/NavBar';
import MesChatsInvite from '../components/MesChatsInvite';

const MesInvitations: React.FC = () => {
  return (
    <>
      <NavBar navbarHeight={30} />
      <div>Mes Invitations</div>
      <MesChatsInvite />
    </>
  );
};

export default MesInvitations;
