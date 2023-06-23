import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Insira a URL base da sua API
  headers:{
     'Content-Type': 'application/json'
  }
});


// Função para realizar uma requisição GET
export const get = (url, config = {}) => {
  return api.get(url, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

// Função para realizar uma requisição POST
export const post = (url, data, config = {}) => {
  return api.post(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

// Função para realizar uma requisição PUT
export const put = (url, data, config = {}) => {
  return api.put(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

// Função para realizar uma requisição DELETE
export const del = (url, config = {}) => {
  return api.delete(url, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};
