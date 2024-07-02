import { ReactKeycloakProvider } from '@react-keycloak/web';

import { ThemeProvider } from 'antd-style';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import keycloak from './keycloak';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ onLoad: 'login-required'}}
    onTokens={({ token }) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }}
  >
    <React.StrictMode>
      <ThemeProvider appearance={'dark'}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
);
