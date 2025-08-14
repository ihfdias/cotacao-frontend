const API_URL = 'http://localhost:5053';

const API_TOKEN = 'meu-token-super-secreto-para-o-desafio';

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