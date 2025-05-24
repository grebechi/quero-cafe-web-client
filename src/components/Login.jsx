import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();  

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ mail: username, pass: password });

            if (data.token) {
                localStorage.setItem('token', data.token);
                setUser(data.user);  
                navigate('/dashboard');
            } else {
                alert('Login falhou: token não recebido.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro de conexão ou falha no servidor');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <form 
                onSubmit={handleLogin} 
                className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>
                
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
