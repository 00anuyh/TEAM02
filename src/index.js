import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { FavProvider } from "./context/FavContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FavProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavProvider>
  </AuthProvider>
);
// 선택: 성능 측정
reportWebVitals();