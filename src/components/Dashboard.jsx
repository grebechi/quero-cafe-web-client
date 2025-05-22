import TraineePanel from './TraineePanel';
import CollaboratorPanel from './CollaboratorPanel';
import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await apiFetch('/me');
            setUser(data);
        }
        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Bem-vindo, {user.name}</h2>
            {user.role === 'trainee' && <TraineePanel />}
            {user.role === 'collaborator' && <CollaboratorPanel />}
        </div>
    );
}
