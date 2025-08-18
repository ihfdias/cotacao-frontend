import { useState, useEffect, useCallback } from 'react';
import { getQuote } from '../services/apiServics.js';
import { isWorkingDay } from '../services/dateService.js';

function QuoteDashboard({ onLogout }) {
  const [cotacao, setCotacao] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Verificando status do mercado...");

  const buscarCotacao = useCallback(async () => {
    try {
      const data = await getQuote();
      if (data.value && data.value.length > 0) {
        setCotacao(data.value[0]);
        setErro(null);
        return true;
      }
      return false;
    } catch (error) {
      setErro(error.message);
      if (error.message.includes('401')) {
        onLogout();
      }
      return false;
    }
  }, [onLogout]);

  useEffect(() => {
    let pollingIntervalId = null;
    let waitingIntervalId = null;

    const startSmartService = async () => {
      const todayIsWorkingDay = await isWorkingDay();
      if (todayIsWorkingDay) {
        setCarregando(true);
        setStatusMessage("Aguardando abertura do mercado...");
        
        const success = await buscarCotacao();
        setCarregando(false);

        if (success) {
          setStatusMessage(null);
          pollingIntervalId = setInterval(buscarCotacao, 5000);
        } else {
          waitingIntervalId = setInterval(async () => {
            const foundQuote = await buscarCotacao();
            if (foundQuote) {
              clearInterval(waitingIntervalId);
              setStatusMessage(null);
              pollingIntervalId = setInterval(buscarCotacao, 5000);
            }
          }, 60000);
        }
      } else {
        setErro("Não há cotação para hoje (fim de semana ou feriado).");
        setCarregando(false);
      }
    };

    startSmartService();

    return () => {
      clearInterval(pollingIntervalId);
      clearInterval(waitingIntervalId);
    };
  }, [buscarCotacao]);

  return (
    <div className="card">
      <button onClick={onLogout} className="logout-button">Sair</button>
      <h1>Cotação do Dólar</h1>
      
      {carregando && <p>{statusMessage}</p>}
      {erro && <p className="error-message">{erro}</p>}
      {!carregando && !erro && !cotacao && <p className="error-message">Aguardando a primeira cotação do dia...</p>}
      
      {cotacao && (
        <>
          <h2>Compra: R$ {cotacao.cotacaoCompra}</h2>
          <h2>Venda: R$ {cotacao.cotacaoVenda}</h2>
          <p>Atualizado em: {new Date(cotacao.dataHoraCotacao).toLocaleString('pt-BR')}</p>
        </>
      )}
    </div>
  );
}

export default QuoteDashboard;
