// src/auth/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

interface UserInfo {
    firstname: string;
    lastname: string;
    email: string;
}

interface AuthContextType {
    token: string | null;
    user: UserInfo | null;
    login: (token: string) => void;
    logout: () => void;
}

function decodeToken(token: string): { firstname: string; lastname: string; email: string } | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email 
        };
    } catch (e) {
        console.error("Token decoding failed", e);
        return null;
    }
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            const decoded = decodeToken(storedToken);
            if (decoded){
                setUser(decoded);
            }
        }
    }, []);
    
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        const decoded = decodeToken(newToken);
        if (decoded){
            setUser(decoded);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};