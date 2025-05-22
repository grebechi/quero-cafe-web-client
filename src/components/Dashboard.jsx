import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoffeesToday, apiFetch } from '../api/client';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [coffeesToday, setCoffeesToday] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
        fetchCoffeesToday();
    }, []);

    async function fetchUser() {
        try {
            const data = await apiFetch('/me');
            setUser(data);
        } catch (err) {
            console.error('Erro ao buscar dados do usuário:', err);
        }
    }

    async function fetchCoffeesToday() {
        try {
            const data = await getCoffeesToday();
            setCoffeesToday(data);
        } catch (err) {
            console.error('Erro ao buscar cafés de hoje:', err);
        }
    }

    function getPeriod(hour) {
        if (hour < 12) return 'Manhã';
        if (hour < 18) return 'Tarde';
        return 'Noite';
    }

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logout realizado com sucesso!');
    }

    async function handleMakeCoffee() {
        try {
            await apiFetch('/coffee', { method: 'POST' });
            toast.success('Você marcou que fez café!');
            fetchCoffeesToday();
        } catch (err) {
            console.error('Erro ao marcar café:', err);
            toast.error('Erro ao marcar café');
        }
    }

    async function handleRequestCoffee() {
        try {
            await apiFetch('/requests', { method: 'POST' });
            toast.success('Você pediu um café!');
            fetchCoffeesToday();
        } catch (err) {
            console.error('Erro ao pedir café:', err);
            toast.error('Erro ao pedir café');
        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-gray-600 text-xl animate-pulse">Carregando dados do usuário...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Toaster position="top-center" />

            {/* Navbar */}
            <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Bem-vindo, {user.name}!
                </h1>
                <div className="flex space-x-4">
                    {user.isTrainee ? (
                        <button 
                            onClick={handleMakeCoffee}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Fazer Café
                        </button>
                    ) : (
                        <button 
                            onClick={handleRequestCoffee}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Pedir Café
                        </button>
                    )}
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Conteúdo principal */}
            <main className="flex flex-1 p-6 space-x-6">
                {/* Painel lateral */}
                <aside className="w-64 bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Perfil</h2>
                    <div className="space-y-2">
                        <div>
                            <span className="font-medium">Admin:</span>{' '}
                            <span className={user.isAdmin ? 'text-green-600' : 'text-red-600'}>
                                {user.isAdmin ? 'Sim' : 'Não'}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">Estagiário:</span>{' '}
                            <span className={user.isTrainee ? 'text-green-600' : 'text-red-600'}>
                                {user.isTrainee ? 'Sim' : 'Não'}
                            </span>
                        </div>
                    </div>
                </aside>

                {/* Lista de cafés */}
                <section className="flex-1 bg-white shadow rounded-lg p-6 overflow-y-auto max-h-[70vh]">
                    <motion.h2 
                        className="text-xl font-semibold mb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Cafés de Hoje
                    </motion.h2>
                    {coffeesToday.length === 0 ? (
                        <p className="text-gray-500">Nenhum café registrado hoje.</p>
                    ) : (
                        <ul className="space-y-2">
                            {coffeesToday.map(coffee => {
                                const date = new Date(coffee.date_created);
                                const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                const period = getPeriod(date.getHours());

                                return (
                                    <li key={coffee.id} className="text-gray-600">
                                        {coffee.trainee_name} às {time} ({period})
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </main>
        </div>
    );
}
