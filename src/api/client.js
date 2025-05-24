import ApiError from './ApiError';

const API_BASE_URL = 'https://quero-cafe-api.gabrielrebechi.com.br';

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(JSON.stringify(data), response.status);
    }

    return data;
}

export function login(credentials) {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
}

export function getCoffeesToday() {
    return apiFetch('/coffee/today');
}

export function requestCoffee() {
    return apiFetch('/requests', { method: 'POST' });
}

export function getMyRequests() {
    return apiFetch('/requests/my');
}

export async function createUser(userData) {
    return apiFetch('/people', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

