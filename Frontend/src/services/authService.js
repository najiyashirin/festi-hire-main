import api from '@/lib/api';
export const authService = {
    registerUser: async (data) => {
        const response = await api.post('/auth/register/user', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', 'user');
        }
        return response.data;
    },
    registerTeam: async (data) => {
        const config = {};
        if (data instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        }
        const response = await api.post('/auth/register/team', data, config);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', 'team');
        }
        return response.data;
    },
    login: async (data) => {
        const response = await api.post('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    },
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
    getUserRole: () => {
        return localStorage.getItem('userRole');
    }
};
