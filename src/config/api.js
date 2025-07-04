import axios from "axios";

// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "http://localhost:8080",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/?tab=login";
      return Promise.reject(error);
    }

    // Retry logic for network errors
    if (
      !error.response &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest._retryCount < API_CONFIG.RETRY_ATTEMPTS
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      await new Promise((resolve) =>
        setTimeout(
          resolve,
          API_CONFIG.RETRY_DELAY * originalRequest._retryCount
        )
      );

      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/user/login",
    REGISTER: "/user/register",
    LOGOUT: "/user/logout",
    REFRESH: "/user/refresh",
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    CHANGE_PASSWORD: "/user/change-password",
    FORGOT_PASSWORD: "/user/forgot-password",
    RESET_PASSWORD: "/user/reset-password",
    VERIFY_EMAIL: "/user/verify-email",
  },

  // Game endpoints
  GAMES: {
    LIST: "/game/list",
    POPULAR: "/game/popular",
    CONTINUE: "/game/continue",
    HISTORY: "/game/history",
    STATS: "/game/stats",
    PLACE_BET: "/game/bet",
    FAIRNESS: "/game/fairness",
  },

  // Sports endpoints
  SPORTS: {
    EVENTS: "/sport/events",
    LIVE_EVENTS: "/sport/live",
    BET: "/sport/bet",
    BET_HISTORY: "/sport/bet-history",
    ODDS: "/sport/odds",
  },

  // Wallet endpoints
  WALLET: {
    BALANCE: "/user/balance",
    DEPOSIT: "/user/deposit",
    WITHDRAW: "/user/withdraw",
    TRANSACTIONS: "/user/transactions",
    PAYMENT_METHODS: "/user/payment-methods",
  },

  // Admin endpoints (if applicable)
  ADMIN: {
    USERS: "/admin/users",
    GAMES: "/admin/games",
    TRANSACTIONS: "/admin/transactions",
    SETTINGS: "/admin/settings",
  },
};

// API service functions
export const apiService = {
  // Generic request methods
  get: (endpoint, config = {}) => apiClient.get(endpoint, config),
  post: (endpoint, data = {}, config = {}) =>
    apiClient.post(endpoint, data, config),
  put: (endpoint, data = {}, config = {}) =>
    apiClient.put(endpoint, data, config),
  patch: (endpoint, data = {}, config = {}) =>
    apiClient.patch(endpoint, data, config),
  delete: (endpoint, config = {}) => apiClient.delete(endpoint, config),

  // Auth services
  auth: {
    login: (credentials) =>
      apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    register: (userData) =>
      apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
    logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),
    getProfile: () => apiClient.get(API_ENDPOINTS.AUTH.PROFILE),
    updateProfile: (data) =>
      apiClient.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data),
    changePassword: (data) =>
      apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
    forgotPassword: (email) =>
      apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
    resetPassword: (data) =>
      apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),
    verifyEmail: (token) =>
      apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token }),
  },

  // Game services
  games: {
    getList: () => apiClient.get(API_ENDPOINTS.GAMES.LIST),
    getPopular: () => apiClient.get(API_ENDPOINTS.GAMES.POPULAR),
    getContinue: () => apiClient.get(API_ENDPOINTS.GAMES.CONTINUE),
    getHistory: (params) =>
      apiClient.get(API_ENDPOINTS.GAMES.HISTORY, { params }),
    getStats: () => apiClient.get(API_ENDPOINTS.GAMES.STATS),
    placeBet: (betData) =>
      apiClient.post(API_ENDPOINTS.GAMES.PLACE_BET, betData),
    getFairness: (gameId) =>
      apiClient.get(`${API_ENDPOINTS.GAMES.FAIRNESS}/${gameId}`),
  },

  // Sports services
  sports: {
    getEvents: (params) =>
      apiClient.get(API_ENDPOINTS.SPORTS.EVENTS, { params }),
    getLiveEvents: () => apiClient.get(API_ENDPOINTS.SPORTS.LIVE_EVENTS),
    placeBet: (betData) => apiClient.post(API_ENDPOINTS.SPORTS.BET, betData),
    getBetHistory: (params) =>
      apiClient.get(API_ENDPOINTS.SPORTS.BET_HISTORY, { params }),
    getOdds: (eventId) =>
      apiClient.get(`${API_ENDPOINTS.SPORTS.ODDS}/${eventId}`),
  },

  // Wallet services
  wallet: {
    getBalance: () => apiClient.get(API_ENDPOINTS.WALLET.BALANCE),
    deposit: (amount, method) =>
      apiClient.post(API_ENDPOINTS.WALLET.DEPOSIT, { amount, method }),
    withdraw: (amount, method) =>
      apiClient.post(API_ENDPOINTS.WALLET.WITHDRAW, { amount, method }),
    getTransactions: (params) =>
      apiClient.get(API_ENDPOINTS.WALLET.TRANSACTIONS, { params }),
    getPaymentMethods: () =>
      apiClient.get(API_ENDPOINTS.WALLET.PAYMENT_METHODS),
  },
};

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: data.message || "Server error occurred",
      status,
      data: data.errors || null,
    };
  } else if (error.request) {
    // Network error
    return {
      message: "Network error. Please check your connection.",
      status: 0,
      data: null,
    };
  } else {
    // Other error
    return {
      message: error.message || "An unexpected error occurred",
      status: 0,
      data: null,
    };
  }
};

export { apiClient, API_CONFIG };
export default apiService;
