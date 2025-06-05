import './App.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/login';
import ChatRoom from './pages/ChatRoom';
import MesChats from './components/MesChatsProprietaire.tsx';
import MesInvitations from './components/MesChatsInvite.tsx';
import Accueil from "./pages/Accueil.tsx";
import NavBar from "./components/NavBar.tsx";
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

const NAVBAR_HEIGHT = 30;

function AppContent() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {!hideNavbar && <NavBar navbarHeight={NAVBAR_HEIGHT} />}

            <div id="mainContent" style={{ flex: 1 }}>
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
                        path="/chatroom"
                        element={
                            <ProtectedRoute>
                                <ChatRoom id={2} />
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

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
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
