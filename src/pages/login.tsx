import { useState, type FormEvent } from 'react';

interface LoginResponse {
    token: string;
}

export default function Login() {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Identifiants invalides');
            }

            const data: LoginResponse = await response.json();
            localStorage.setItem('token', data.token);
            console.log('Token reçu :', data.token);

            // redirection après login
            window.location.href = '/dashboard';
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto' }}>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                    required
                /><br />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit">Se connecter</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
