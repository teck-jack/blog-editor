import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  return api.post('/auth/register', userData);
};

export const login = async (credentials) => {
  return api.post('/auth/login', credentials);
};

export const saveDraft = async (blogData) => {
  return api.post('/blogs/save-draft', blogData);
};

export const publishBlog = async (blogData) => {
  return api.post('/blogs/publish', blogData);
};

export const getAllBlogs = async () => {
  return api.get('/blogs');
};

export const getBlogById = async (id) => {
  return api.get(`/blogs/${id}`);
};

export const deleteBlog = async (id) => {
  return api.delete(`/blogs/${id}`);
};