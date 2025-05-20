import axios from 'axios';

/**
 * Instância do Axios configurada para comunicação com o JSON Server.
 * 
 * @constant
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Interceptor para requisições
api.interceptors.request.use(
  config => {
    // Aqui você poderia adicionar tokens de autenticação, etc.
    return config;
  },
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) {
      console.error('Erro de rede ou servidor indisponível');
    } else {
      console.error(`Erro ${error.response.status}: ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default api;
