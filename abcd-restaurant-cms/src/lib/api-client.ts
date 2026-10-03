import axios from 'axios';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Set a 20-second timeout so requests don't hang indefinitely if the backend freezes
  timeout: 20000,
  // Ensure cookies (for future HttpOnly auth) are sent with every request
  withCredentials: true,
});

// Interceptor to handle global errors (e.g., 401 Unauthorized redirect)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (redirect to login or trigger global state)
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
