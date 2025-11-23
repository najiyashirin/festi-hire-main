import api from '@/lib/api';
export const jobService = {
    getJobs: async (params) => {
        const response = await api.get('/jobs', { params });
        return response.data;
    },
    getJob: async (id) => {
        const response = await api.get(`/jobs/${id}`);
        return response.data;
    },
    createJob: async (data) => {
        const response = await api.post('/jobs', data);
        return response.data;
    },
    updateJob: async (id, data) => {
        const response = await api.put(`/jobs/${id}`, data);
        return response.data;
    },
    deleteJob: async (id) => {
        const response = await api.delete(`/jobs/${id}`);
        return response.data;
    },
    applyToJob: async (id) => {
        const response = await api.post(`/jobs/${id}/apply`);
        return response.data;
    },
    getTeamJobs: async () => {
        const response = await api.get('/jobs/team/listings');
        return response.data;
    },
    updateApplicationStatus: async (applicationId, status) => {
        const response = await api.put(`/jobs/applications/${applicationId}`, { status });
        return response.data;
    }
};
