import styles from './Saldo.module.css';
import { Link } from 'react-router-dom';
import saldo from './imagensesion/saldosmovi.jpg';
import transfer from './imagensesion/transdine.jpg';
import solicitud from './imagensesion/solicitud.png';
import design from './imagensesion/design.png';
import inicio from './imagensesion/inicio.jpg';
import design2 from './imagensesion/design2.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Saldo = () => {
  const [usuarioData, setUsuarioData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const id_cliente = localStorage.getItem('numero_cuenta'); // Asegúrate de que esta clave exista en el localStorage
      if (!id_cliente) {
        setError('Número de cuenta no encontrado');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/obtbitacora/${id_cliente}`);
        setUsuarioData(response.data.data); // Aquí se obtiene el array de `data` en la respuesta
        console.log("Datos de usuario:", response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error al obtener los datos del usuario');
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchUsuario();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['container3']}>
        <img src={design} alt='' style={{width:"100%", height:"100px" }} />
      </div>
      <div className={styles['container2']}>
        <div>
          <br/>
          <h3><span>Bitácora de Transacciones</span></h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {usuarioData.length > 0 ? (
            usuarioData.map((transaccion, index) => (
              <div key={index} className={styles['transaccion']}>
                <p><strong>Tipo:</strong> {transaccion.tipo}</p>
                <p><strong>Monto:</strong> {transaccion.monto}</p>
                <p><strong>Fecha:</strong> {new Date(transaccion.fecha_transaccion).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
        </div>
      </div>
      <div className={styles['container3']}>
        <div className={styles['boxes1']}>
          <Link to={'/saldo'}>
            <img src={saldo} alt='' style={{width:"100px", height:"100px" }} />
          </Link>
        </div>
        <div className={styles['boxes2']}>
          <Link to={'/transacciones'}>
          <img src={transfer} alt='' style={{width:"100px", height:"100px" }} />
          </Link>
        </div>
        <div className={styles['boxes3']}>
        <Link to={'/prestamo'}>
          <img src={solicitud} alt='' style={{width:"100px", height:"100px" }} />
        </Link>
        </div>
        <div className={styles['boxes4']}>
          <Link to={'/sesion'}>
          <img src={inicio} alt='' style={{width:"100px", height:"100px" }} />
          </Link>
        </div>
      </div>
      <div className={styles['container4']}>
        <Link to={'/login'}>
          <button className={styles['login-button']}>Salir</button>
        </Link>
      </div>
      <img src={design2} alt='' style={{width:"100%", height:"100px" }} />
    </div>
  );
};