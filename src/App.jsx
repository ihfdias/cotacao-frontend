import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm.jsx';
import QuoteDashboard from './components/QuoteDashboard.jsx';

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
