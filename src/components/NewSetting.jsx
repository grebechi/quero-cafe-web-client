import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import { Toaster, toast } from 'react-hot-toast';

export default function NewSetting() {
    const [settings, setSettings] = useState([]);
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        try {
            const data = await apiFetch('/api/settings');
            setSettings(data);
        } catch (err) {
            console.error('Erro ao buscar configurações:', err);
            toast.error('Erro ao buscar configurações.');
        }
    }

    async function handleUpdate(key, value) {
        try {
            await apiFetch(`/api/settings/${key}`, {
                method: 'PUT',
                body: JSON.stringify({ value }),
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success(`Configuração ${key} atualizada!`);
            fetchSettings();
        } catch (err) {
            console.error(`Erro ao atualizar ${key}:`, err);
            toast.error(`Erro ao atualizar ${key}.`);
        }
    }

    async function handleAddSetting(e) {
        e.preventDefault();

        try {
            await apiFetch(`/api/settings/${newKey}`, {
                method: 'PUT',
                body: JSON.stringify({ value: newValue }),
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success(`Configuração ${newKey} adicionada!`);
            setNewKey('');
            setNewValue('');
            fetchSettings();
        } catch (err) {
            console.error('Erro ao adicionar configuração:', err);
            toast.error('Erro ao adicionar configuração.');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen text-gray-800">
            <Toaster position="top-center" />

            <h2 className="text-3xl font-bold mb-8">Gerenciar Configurações</h2>

            <div className="w-full max-w-md bg-white p-6 shadow rounded mb-8">
                <h3 className="text-xl font-semibold mb-4">Adicionar Nova Configuração</h3>
                <form onSubmit={handleAddSetting} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Chave</label>
                        <input
                            type="text"
                            value={newKey}
                            onChange={(e) => setNewKey(e.target.value)}
                            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Valor</label>
                        <input
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Adicionar
                    </button>
                </form>
            </div>

            <div className="w-full max-w-md bg-white p-6 shadow rounded">
                <h3 className="text-xl font-semibold mb-4">Configurações Existentes</h3>

                {settings.length === 0 ? (
                    <p className="text-gray-500">Nenhuma configuração encontrada.</p>
                ) : (
                    <ul className="space-y-4">
                        {settings.map((setting) => (
                            <li key={setting.id} className="flex items-center space-x-2">
                                <span className="font-mono text-sm">{setting.key_name}:</span>
                                <input
                                    type="text"
                                    defaultValue={setting.value}
                                    onBlur={(e) => handleUpdate(setting.key_name, e.target.value)}
                                    className="flex-1 border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                onClick={() => navigate('/dashboard')}
                className="mt-8 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
                Voltar para Dashboard
            </button>
        </div>
    );
}
