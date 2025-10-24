import axios from 'axios';
const API_BASE = 'http://localhost:4000/api';

export const uploadCSV = (file) => {
  const form = new FormData();
  form.append('file', file);
  return axios.post(`${API_BASE}/upload/csv`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const requestPredict = (payload) => {
  return axios.post(`${API_BASE}/predict`, payload);
};

export const getHistory = () => axios.get(`${API_BASE}/predict/history`);
