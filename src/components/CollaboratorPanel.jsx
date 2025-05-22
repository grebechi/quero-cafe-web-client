import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

export default function CollaboratorPanel() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function fetchRequests() {
            const data = await apiFetch('/requests/today');
            setRequests(data);
        }
        fetchRequests();
    }, []);

    const requestCoffee = async () => {
        await apiFetch('/requests', { method: 'POST' });
        alert('Você solicitou café!');
    };

    return (
        <div>
            <h3>Solicitações de café hoje:</h3>
            <ul>
                {requests.map(req => (
                    <li key={req.id}>{req.person} pediu café às {req.time}</li>
                ))}
            </ul>
            <button onClick={requestCoffee}>Pedir café</button>
        </div>
    );
}
