const API_URL = import.meta.env.VITE_API_URL;


export const login = async (username, password) => {
  const response = await fetch(`${API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Falha no login. Verifique suas credenciais.');
  }

  const data = await response.json();
  return data.token; 
};


export const getQuote = async () => {
 
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('Nenhum token de autenticação encontrado.');
  }

  const headers = {
    
    'Authorization': `Bearer ${token}`
  };

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    
    if (response.status === 401) {
      
      localStorage.removeItem('authToken');
    }
    throw new Error('Falha ao buscar dados da API. Status: ' + response.status);
  }

  const data = await response.json();
  return data;
};