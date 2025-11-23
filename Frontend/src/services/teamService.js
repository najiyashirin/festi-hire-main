import api from '@/lib/api';
export const teamService = {
    getTeams: async (params) => {
        const response = await api.get('/teams', { params });
        return response.data;
    },
    getTeam: async (id) => {
        const response = await api.get(`/teams/${id}`);
        return response.data;
    },
    getOwnProfile: async () => {
        const response = await api.get('/teams/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item instanceof File || typeof item === 'string') {
                        formData.append(key, item);
                    }
                    else if (item != null) {
                        formData.append(key, String(item));
                    }
                });
            }
            else if (value !== null && value !== undefined) {
                if (value instanceof File || typeof value === 'string') {
                    formData.append(key, value);
                }
                else {
                    formData.append(key, String(value));
                }
            }
        });
        const response = await api.put('/teams/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    uploadVerificationDocs: async (files) => {
        const formData = new FormData();
        if (files.businessLicense)
            formData.append('businessLicense', files.businessLicense);
        if (files.insurance)
            formData.append('insurance', files.insurance);
        if (files.idProof)
            formData.append('idProof', files.idProof);
        const response = await api.post('/teams/verify', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    addReview: async (teamId, data) => {
        const response = await api.post(`/teams/${teamId}/reviews`, data);
        return response.data;
    },
    deleteAccount: async () => {
        const response = await api.delete('/teams/account');
        return response.data;
    }
};
