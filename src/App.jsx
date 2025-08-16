import { useState, useEffect } from 'react';
import { login, getQuote } from './services/apiServices.js';
import './App.css';


function LoginForm({ onLoginSuccess, setGlobalError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true);
    setGlobalError(null); 
    try {
      const receivedToken = await login(username, password);
      onLoginSuccess(receivedToken); 
    } catch (error) {
      setGlobalError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="card login-card">
      <h1>Autenticação</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}


function QuoteDashboard({ onLogout }) {
  const [cotacao, setCotacao] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const buscarCotacao = async () => {
    setCarregando(true);
    try {
      const data = await getQuote();
      if (data.value && data.value.length > 0) {
        setCotacao(data.value[0]);
        setErro(null);
      } else {
        setCotacao(null);
        setErro("Não há cotação para hoje (fim de semana ou feriado).");
      }
    } catch (error) {
      setErro(error.message);
      if (error.message.includes('401')) { 
        onLogout();
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarCotacao();
    const intervalId = setInterval(buscarCotacao, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card">
      <button onClick={onLogout} className="logout-button">Sair</button>
      <h1>Cotação do Dólar</h1>
      
      {carregando && !cotacao && <p>Carregando...</p>}
      {erro && <p className="error-message">{erro}</p>}
      {cotacao && (
        <>
          <h2>Compra: R$ {cotacao.cotacaoCompra}</h2>
          <h2>Venda: R$ {cotacao.cotacaoVenda}</h2>
          <p>Atualizado em: {new Date(cotacao.dataHoraCotacao).toLocaleString('pt-BR')}</p>
        </>
      )}
       <button onClick={buscarCotacao} disabled={carregando}>
        {carregando ? 'Atualizando...' : 'Atualizar Agora'}
      </button>
    </div>
  );
}


function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [globalError, setGlobalError] = useState(null);

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem('authToken', receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <div>
      {globalError && <p className="error-banner">{globalError}</p>}
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} setGlobalError={setGlobalError} />
      ) : (
        <QuoteDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;