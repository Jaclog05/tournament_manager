import axios from 'axios';

const { API_URL } = import.meta.env;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, name) => api.post('/auth/register', { email, password, name }),
  verifyToken: () => api.get('/user/profile')
};

export const tournamentService = {
  getAll: () => api.get('/tournaments'),
  getById: (id) => api.get(`/tournaments/${id}`),
  create: (data) => api.post('/tournaments', data),
  update: (id, data) => api.put(`/tournaments/${id}`, data),
  delete: (id) => api.delete(`/tournaments/${id}`),
  getStandings: (tournamentId) => api.get(`/tournaments/${tournamentId}/standings`),
  getPredictions: (tournamentId) => api.get(`/tournaments/${tournamentId}/predictions`)
};

export const teamService = {
  getByTournament: (tournamentId) => api.get(`/tournaments/${tournamentId}/teams`),
  create: (tournamentId, data) => api.post(`/tournaments/${tournamentId}/teams`, data)
};

export const matchService = {
  getByTournament: (tournamentId) => api.get(`/tournaments/${tournamentId}/matches`),
  create: (tournamentId, data) => api.post(`/tournaments/${tournamentId}/matches`, data),
  updateResult: (tournamentId, matchId, data) => api.patch(`/tournaments/${tournamentId}/matches/${matchId}/result`, data)
};
