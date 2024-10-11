import { createRoot } from 'react-dom/client'
import { Login } from './pages/IniciarSesion/Login.jsx'
import { Register } from './pages/Registrarse/Register.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Router>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</Router>
) 
