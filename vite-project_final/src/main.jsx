import { createRoot } from 'react-dom/client'
import { Login } from './pages/IniciarSesion/Login.jsx'
import { Register } from './pages/Registrarse/Register.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import { Sesion } from './pages/sesion/Sesion.jsx'
import './index.css'
import { Transacciones } from './pages/transacciones/Transacciones.jsx';
import { Prestamo } from './pages/prestamo/Prestamo.jsx';
import { Saldo } from './pages/saldo/Saldo.jsx';


createRoot(document.getElementById('root')).render(
  <Router>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/sesion" element={<Sesion />} />
    <Route path="/transacciones" element={<Transacciones />} />
    <Route path="/prestamo" element={<Prestamo />} />
    <Route path="/saldo" element={<Saldo />} />
  </Routes>
</Router>
) 
