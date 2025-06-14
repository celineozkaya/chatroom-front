// src/pages/login
import { useState, type FormEvent, type CSSProperties } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import style from "../styles/Button.module.css";


interface LoginResponse {
    readonly token: string;
}

const formStyle : CSSProperties = {
    display: "flex", 
    flexDirection: "column",
    gap: "10px", 
    borderRadius : "20px",  
    width : "40%", 
    padding :"26px",
    backgroundColor :"white"
}

const inputStyle : CSSProperties = {
    padding : "10px",
    fontSize : "16px", 
    border : "1px solid lightgrey", 
    borderRadius : "20px", 
    height : "40px",
}

export default function Login() {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Récupère la page d'origine avant la redirection
    const from = location.state?.from?.pathname || '/dashboard';

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Identifiants invalides');
            }

            const data: LoginResponse = await response.json();
            
            // console.log({data});
            // console.log(data.token);
            // console.log(parseJwt(data.token)); // .sub = id, .email = email
            // console.log(data.usersId);
            login(data.token); // Utilise le contexte pour stocker le token

            // Redirection vers la page d'origine
            navigate(from, { replace: true });
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems : "center"}}>
            <div style={{fontSize :"26px", padding : "20px"}}>Connexion</div>
            <form onSubmit={handleLogin} style={formStyle}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    style = {inputStyle}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style = {inputStyle}
                />
                
                <div style={{display : "flex", justifyContent : "center"}}>
                    <button type="submit" className={style.button}>Se connecter</button>
                </div>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}