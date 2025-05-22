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
    return response.json();
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

