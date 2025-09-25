import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import FileUploader from './components/FileUploader';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F239FC',
    },
    secondary: {
      main: '#1D88FF',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {isAuthenticated ? (
          <>
            <Header onLogout={handleLogout} />
            <FileUploader />
          </>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
