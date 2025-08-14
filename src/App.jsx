import { useState, useEffect, useCallback } from 'react'; 
import { getQuote } from './services/apiServices.js';
import './App.css'; 

function App() {
  const [cotacao, setCotacao] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true); 

  const buscarCotacao = useCallback(async () => {
    setCarregando(true); 
    setErro(null);
    try {
      const data = await getQuote();
      setCotacao(data.value[0]);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false); 
    }
  }, []); 

  useEffect(() => {
    buscarCotacao(); 
    const intervalId = setInterval(buscarCotacao, 5000);
    return () => clearInterval(intervalId);
  }, [buscarCotacao]); 

  
  if (erro && !cotacao) {
    return <h1>Erro ao buscar cotação: {erro}</h1>;
  }
  
  
  if (!cotacao && carregando) {
    return <h1>Carregando...</h1>;
  }
  
  
  return (
    <div className="card">
      <h1>Cotação do Dólar</h1>
      
      {}
      {cotacao && (
        <>
          <h2>Compra: R$ {cotacao.cotacaoCompra}</h2>
          <h2>Venda: R$ {cotacao.cotacaoVenda}</h2>
          <p>Atualizado em: {new Date(cotacao.dataHoraCotacao).toLocaleString('pt-BR')}</p>
        </>
      )}

      {}
      {erro && <p style={{ color: 'red' }}>Falha ao atualizar: {erro}</p>}

      <button onClick={buscarCotacao} disabled={carregando}>
        {carregando ? 'Atualizando...' : 'Atualizar Agora'}
      </button>
    </div>
  );
}

export default App;