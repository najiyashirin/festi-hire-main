import api from '@/lib/api';
export const userService = {
    updateProfile: async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });
        const response = await api.put('/users/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    getApplications: async () => {
        const response = await api.get('/users/applications');
        return response.data;
    },
    deleteAccount: async () => {
        const response = await api.delete('/users/account');
        return response.data;
    }
};
