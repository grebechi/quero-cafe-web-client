import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

export default function TraineePanel() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function fetchRequests() {
            const data = await apiFetch('/requests/today');
            setRequests(data);
        }
        fetchRequests();
    }, []);

    const markCoffeeDone = async () => {
        await apiFetch('/coffee', { method: 'POST' });
        alert('Você marcou que fez café!');
    };

    return (
        <div>
            <h3>Solicitações de café hoje:</h3>
            <ul>
                {requests.map(req => (
                    <li key={req.id}>{req.person} pediu café às {req.time}</li>
                ))}
            </ul>
            <button onClick={markCoffeeDone}>Marcar que já fiz café</button>
        </div>
    );
}
