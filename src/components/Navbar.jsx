import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ onLogout, onMakeCoffee, onRequestCoffee }) {
    const { user } = useAuth();

    return (
        <nav className="bg-white shadow py-4">
            <div className="container mx-auto flex items-center justify-between px-6">
                <h1 className="text-xl font-semibold text-gray-800">
                    Bem-vindo, {user?.name}!
                </h1>

                <div className="flex space-x-2">
                    {user?.isTrainee ? (
                        <button 
                            onClick={onMakeCoffee}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                        >
                            Fazer Café
                        </button>
                    ) : (
                        <button 
                            onClick={onRequestCoffee}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                        >
                            Pedir Café
                        </button>
                    )}
                    <button 
                        onClick={onLogout}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
