import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoffeesToday, apiFetch } from '../api/client';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import CoffeeList from './CoffeeList';

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
            
            <Navbar 
                user={user}
                onLogout={handleLogout}
                onMakeCoffee={handleMakeCoffee}
                onRequestCoffee={handleRequestCoffee}
            />

            <main className="flex flex-1 p-6 space-x-6">
                <ProfileCard user={user} />
                <CoffeeList coffees={coffeesToday} />
            </main>
        </div>
    );
}
