import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you use the correct import for React 18+ and Vite
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'; // Import your App component

// Use React 18's new root API (ReactDOM.createRoot)
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
