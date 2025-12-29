import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

// Leads
export const submitLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

// Setups
export const getSetups = async (params = {}) => {
  const response = await api.get('/setups', { params });
  return response.data;
};

export const getSetupBySlug = async (slug) => {
  const response = await api.get(`/setups/${slug}`);
  return response.data;
};

// Menus
export const getMenus = async (params = {}) => {
  const response = await api.get('/menus', { params });
  return response.data;
};

// Testimonials
export const getTestimonials = async (params = {}) => {
  const response = await api.get('/testimonials', { params });
  return response.data;
};

// Gallery
export const getGallery = async (params = {}) => {
  const response = await api.get('/gallery', { params });
  return response.data;
};

// Packages
export const getPackages = async () => {
  const response = await api.get('/packages');
  return response.data;
};

// FAQs
export const getFAQs = async (params = {}) => {
  const response = await api.get('/faqs', { params });
  return response.data;
};

export default api;
