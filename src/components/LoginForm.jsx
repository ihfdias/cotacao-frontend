import { useState } from 'react';
import { login } from '../services/apiService.js';

function LoginForm({ onLoginSuccess, setGlobalError }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('12345');
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

export default LoginForm;
