import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (data) => api.post('/users/register', data),
    login: (data) => api.post('/users/login', data),
    setupAdmin: () => api.post('/users/setup-admin'),
};

export const productAPI = {
    getAll: () => api.get('/products'),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
};

export const cartAPI = {
    get: () => api.get('/users/cart'),
    add: (productId, quantity) => api.post('/users/cart', { productId, quantity }),
};

export default api;
