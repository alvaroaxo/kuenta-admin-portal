import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    // Aquí puedes modificar la configuración antes de que se envíe la petición
    // Por ejemplo, añadir un token de autenticación
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log("Starting Request", config);
    return config;
  },
  (error) => {
    // Manejar errores de la petición
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => {
    // Cualquier código de estado que se encuentre dentro del rango de 2xx causa que esta función se active
    // Aquí puedes procesar la respuesta antes de que se entregue
    console.log("Response Received", response);
    return response;
  },
  (error) => {
    // Cualquier código de estado que caiga fuera del rango de 2xx causa que esta función se active
    // Aquí puedes manejar los errores de respuesta de forma global
    console.error("Response Error", error.response);
    if (error.response?.status === 401) {
      // Por ejemplo, redirigir al login si no está autorizado
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, publicApi };
