import axios from 'axios';
import {
  defaultSetups,
  defaultDrinks,
  defaultTestimonials,
  defaultGallery,
  defaultPackages,
  defaultFaqs,
} from './staticData.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

const simulateApiCall = (data, params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = [...data];

      if (params.featured !== undefined) {
        filteredData = filteredData.filter(item => item.featured === params.featured);
      }
      
      if (params.category) {
        filteredData = filteredData.filter(item => item.category === params.category);
      }
      
      if (params.occasion) {
        filteredData = filteredData.filter(item => item.occasion.includes(params.occasion));
      }

      if (params.style) {
        filteredData = filteredData.filter(item => item.style === params.style);
      }
      
      if (params.type) {
        filteredData = filteredData.filter(item => item.type === params.type);
      }

      if (params.flavor) {
        filteredData = filteredData.filter(item => item.flavor_profile.includes(params.flavor));
      }

      if (params.molecular !== undefined) {
        filteredData = filteredData.filter(item => item.molecular === params.molecular);
      }

      resolve(filteredData);
    }, 100); // 100ms delay to simulate network
  });
};

// Health check
export const checkHealth = async () => {
  // This can still hit the backend if needed, or return a static status
  // For now, let's keep it hitting the real endpoint if available
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    return { status: "healthy", email_enabled: false, timestamp: new Date().toISOString() };
  }
};

// Leads - This should remain as it sends data
export const submitLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

// Setups
export const getSetups = async (params = {}) => {
  return simulateApiCall(defaultSetups, params);
};

export const getSetupBySlug = async (slug) => {
  const setup = defaultSetups.find(s => s.slug === slug);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (setup) {
        resolve(setup);
      } else {
        reject(new Error('Setup not found'));
      }
    }, 100);
  });
};

// Menus
export const getMenus = async (params = {}) => {
  return simulateApiCall(defaultDrinks, params);
};

// Testimonials
export const getTestimonials = async (params = {}) => {
  return simulateApiCall(defaultTestimonials, params);
};

// Gallery - Note: The Gallery component was already updated to use local data.
// This function is now also using the static data for consistency.
export const getGallery = async (params = {}) => {
  return simulateApiCall(defaultGallery, params);
};

// Packages
export const getPackages = async () => {
  return simulateApiCall(defaultPackages);
};

// FAQs
export const getFAQs = async (params = {}) => {
  return simulateApiCall(defaultFaqs, params);
};

export default api;
