import { useState, useEffect, useCallback } from 'react';
import { getQuote } from '../services/apiService.js';
import { isWorkingDay } from '../services/dateService.js';

function QuoteDashboard({ onLogout }) {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Verificando o status do mercado...");

  const fetchQuote = useCallback(async () => {
    try {
      const data = await getQuote();
      if (data.value && data.value.length > 0) {
        setQuote(data.value[0]);
        setError(null);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      if (err.message.includes('401')) {
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
        setIsLoading(true);
        setStatusMessage("Aguardando abertura do mercado...");
        
        const success = await fetchQuote();
        setIsLoading(false);

        if (success) {
          setStatusMessage(null);
          pollingIntervalId = setInterval(fetchQuote, 5000);
        } else {
          waitingIntervalId = setInterval(async () => {
            const foundQuote = await fetchQuote();
            if (foundQuote) {
              clearInterval(waitingIntervalId);
              setStatusMessage(null);
              pollingIntervalId = setInterval(fetchQuote, 5000);
            }
          }, 60000);
        }
      } else {
        setError("Nenhuma cotação disponível hoje (fim de semana ou feriado).");
        setIsLoading(false);
      }
    };

    startSmartService();

    return () => {
      clearInterval(pollingIntervalId);
      clearInterval(waitingIntervalId);
    };
  }, [fetchQuote]);

  return (
    <div className="card">
      <button onClick={onLogout} className="logout-button">Logout</button>
      <h1>Cotação do dólar</h1>
      
      {isLoading && <p>{statusMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && !quote && <p className="error-message">Aguardando a primeira cotação do dia...</p>}
      
      {quote && (
        <>
          <h2>Buy: R$ {quote.cotacaoCompra}</h2>
          <h2>Sell: R$ {quote.cotacaoVenda}</h2>
          <p>Updated at: {new Date(quote.dataHoraCotacao).toLocaleString('pt-BR')}</p>
        </>
      )}
    </div>
  );
}

export default QuoteDashboard;
