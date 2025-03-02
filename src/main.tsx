import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './config/global.css';

import Navbar from './components/navbar/Navbar.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Home from './pages/Home.tsx'
import CodeQR from './pages/CodeQR.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/CodeQR" element={<CodeQR />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
