const API_URL = import.meta.env.VITE_API_URL;

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const getQuote = async () => {
    const headers = {
        'baseToken': API_TOKEN
    };
    
    const response = await fetch(API_URL, {
        method: 'GET', 
        headers: headers
    });

    if (!response.ok) {
        
        throw new Error('Falha ao buscar dados da API. Status: ' + response.status);
    }
    
    const data = await response.json();
  
    return data;
};