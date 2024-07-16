import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStye from './styles/GlobalStyle.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
            <GlobalStye/>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
);
