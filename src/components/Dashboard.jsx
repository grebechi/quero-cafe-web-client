import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoffeesToday, apiFetch, getMyRequests, requestCoffee } from '../api/client';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import CoffeeList from './CoffeeList';
import MyRequestList from './MyRequestList';
import ApiError from '../api/ApiError';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [coffeesToday, setCoffeesToday] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
        fetchCoffeesToday();
        fetchMyRequests();
    }, []);

    async function fetchUser() {
        try {
            const data = await apiFetch('/user/me');
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

    async function fetchMyRequests() {
        try {
            const data = await getMyRequests();
            setMyRequests(data);
        } catch (err) {
            console.error('Erro ao buscar minhas requisições:', err);
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
            if (err instanceof ApiError && err.status === 429) {
                try {
                    const { error, lastCoffee, remaining } = JSON.parse(err.message);
                    toast.error(`${error} Último café: ${new Date(lastCoffee).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Aguarde mais ${remaining} min.`);
                } catch (e) {
                    toast.error('Aguarde um pouco antes de marcar café novamente.');
                }
            } else {
                toast.error('Erro ao marcar café');
            }
        }
    }

    async function handleRequestCoffee() {
        try {
            await requestCoffee();
            toast.success('Você pediu um café!');
            fetchCoffeesToday();
            fetchMyRequests();
        } catch (err) {
            console.error('Erro ao pedir café:', err);
            if (err instanceof ApiError && err.status === 429) {
                try {
                    const { error, lastRequest, remainingMinutes } = JSON.parse(err.message);
                    toast.error(`${error} Último pedido: ${new Date(lastRequest).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Aguarde mais ${remainingMinutes} min.`);
                } catch (e) {
                    toast.error('Aguarde um pouco antes de pedir novamente.');
                }
            } else {
                toast.error('Erro ao pedir café');
            }
        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-gray-700 text-xl animate-pulse">Carregando dados do usuário...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
            <Toaster position="top-center" />

            <Navbar
                onLogout={handleLogout}
                onMakeCoffee={handleMakeCoffee}
                onRequestCoffee={handleRequestCoffee}
            />

            <header className="flex justify-center mt-6">
                <ProfileCard user={user} />
            </header>

            <main className="flex justify-center w-full p-6">
                <div className={`w-full max-w-6xl grid gap-6 ${user.isTrainee ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <CoffeeList coffees={coffeesToday} />

                    {!user.isTrainee && (
                        <MyRequestList requests={myRequests} />
                    )}
                </div>
            </main>
        </div>
    );
}
