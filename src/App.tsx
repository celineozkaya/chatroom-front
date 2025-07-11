import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/login';
import ChatRoom from './pages/ChatRoom.tsx';
import MesChats from './components/MesChatsProprietaire.tsx';
import MesInvitations from './components/MesChatsInvite.tsx';
import Accueil from "./pages/Accueil.tsx";
import NavBar from "./components/NavBar.tsx";
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import CreateChat from './pages/CreateChat.tsx';

const NAVBAR_HEIGHT = 50;

function AppContent() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';

    return (
        <>
            {!hideNavbar && <NavBar navbarHeight={NAVBAR_HEIGHT} />}

            <div id="mainContent" style={{width : "100%", height:`calc(100% - ${NAVBAR_HEIGHT}px)`, backgroundColor : "lightgrey"}}>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Accueil />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat/:chatId"
                        element={
                            <ProtectedRoute>
                                <ChatRoom/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/mes-chats"
                        element={
                            <ProtectedRoute>
                                <MesChats />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/mes-invitations"
                        element={
                            <ProtectedRoute>
                                <MesInvitations />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/creer-un-chat"
                        element={
                            <ProtectedRoute>
                                <CreateChat />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
