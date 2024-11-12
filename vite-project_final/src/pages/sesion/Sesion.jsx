import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sesion.module.css';
import { Link } from 'react-router-dom';
import saldo from './imagensesion/saldosmovi.jpg';
import transfer from './imagensesion/transdine.jpg';
import solicitud from './imagensesion/solicitud.png';
import design from './imagensesion/design.png';
import inicio from './imagensesion/inicio.jpg';
import design2 from './imagensesion/design2.png';

export const Sesion = () => {
  const [saldoUsuario, setSaldoUsuario] = useState(null); // Estado para almacenar el saldo
  const [usuario, setUsuario] = useState(''); // Estado para almacenar el nombre del usuario
  const [cuenta, setCuenta] = useState(''); // Estado para almacenar el nombre del usuario
  console.log('aja', cuenta);
            

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const userId = localStorage.getItem("userId");
    console.log(userId);

    if (userId) {
      // Hacer la solicitud al backend para obtener el saldo del usuario
      axios.get(`http://localhost:3000/obtusuario/${userId}`)
        .then(response => {
          // Verificar que la respuesta tenga los datos correctos
          if (response.data && response.data.data) {
            setSaldoUsuario(response.data.data.saldo);
            setUsuario(response.data.data.usuario); // Si también quieres mostrar el nombre del usuario
            setCuenta(response.data.data.numero_cuenta);
            
          } else {
            console.error("Datos del usuario no encontrados");
          }
        })
        .catch(error => {
          console.error("Error al obtener saldo:", error);
        });
    } else {
      console.error("Usuario no encontrado en localStorage");
    }
  }, []); // Se ejecuta solo una vez cuando el componente se monta





  return (
    <div className={styles['container']}>
      <img src={design} alt='' style={{ width: "100%", height: "100px" }} />
      <h2>Bienvenido {usuario ? usuario : "usuario"}</h2>
      <div className={styles['container8']}>
        <div>
          <h2>Cuenta: 
            <span>{cuenta !== null ? cuenta : "Cargando..."}</span>
          </h2>
        </div>
      </div>

        <div>
          <h2>
            <span>Saldo: {saldoUsuario !== null ? saldoUsuario : "Cargando..."}</span>
          </h2>
        </div>
      


      <div className={styles['container3']}>
        <div className={styles['boxes1']}>
          <Link to={'/saldo'}>
            <img src={saldo} alt='' style={{ width: "100px", height: "100px" }} />
          </Link>
        </div>
        <div className={styles['boxes2']}>
          <Link to={'/transacciones'}>
            <img src={transfer} alt='' style={{ width: "100px", height: "100px" }} />
          </Link>
        </div>
        <div className={styles['boxes3']}>
          <Link to={'/prestamo'}>
            <img src={solicitud} alt='' style={{ width: "100px", height: "100px" }} />
          </Link>
        </div>
        <div className={styles['boxes4']}>
          <Link to={'/sesion'}>
            <img src={inicio} alt='' style={{ width: "100px", height: "100px" }} />
          </Link>
        </div>
      </div>

      <div className={styles['container4']}>
        <Link to={'/login'}>
          <button className={styles['login-button']}>Salir</button>
        </Link>
      </div>
      
      
      <img src={design2} alt='' style={{ width: "100%", height: "100px" }} />
    </div>
  );
};





  
/*import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sesion.module.css';
import saldo from './imagensesion/saldosmovi.jpg';
import transfer from './imagensesion/transdine.jpg';
import solicitud from './imagensesion/solicitud.png';
import design from './imagensesion/design.png';
import inicio from './imagensesion/inicio.jpg';
import design2 from './imagensesion/design2.png';
import axios from 'axios';

export const Sesion = () => {
  const [saldoUsuario, setSaldoUsuario] = useState(null);

  useEffect(() => {
    const obtenerSaldo = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(`http://localhost:3000/obtusuario/${userId}`);
        if (response.data && response.data.saldo) {
          setSaldoUsuario(response.data.saldo); // Actualiza el estado con el saldo obtenido
        } else {
          console.log("No se encontró información de saldo en la respuesta");
        }
      } catch (error) {
        console.error("Error al obtener saldo:", error);
      }
    };

    obtenerSaldo();
  }, []);

  return (
    <div className={styles['container']}>
      <img src={design} alt='' style={{width:"100%", height:"100px" }} />
      <h1>Hola, usuario</h1>
      <div className={styles['container2']}>
        <div>
          <h1>Saldo: <span>{saldoUsuario !== null ? `${saldoUsuario}` : 'Cargando...'}</span></h1>
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
          <Link to={'/'}>
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
};*/
/*import styles from './Sesion.module.css';
import { Link } from 'react-router-dom';
import saldo from './imagensesion/saldosmovi.jpg'
import transfer from './imagensesion/transdine.jpg'
import solicitud from './imagensesion/solicitud.png'
import design from './imagensesion/design.png'
import inicio from './imagensesion/inicio.jpg'
import design2 from './imagensesion/design2.png'



export const Sesion = () => {

  return (
    <div className={styles['container']}>
      <img src={design} alt='' style={{width:"100%", height:"100px" }}/>
      <h1>hola usuario</h1>
      <div className={styles['container2']}>
        <div><h1><n></n>2'500.000</h1></div>
      </div>
        
      
      <div className={styles['container3']}>
      
        <div className={styles['boxes1']}>
          <Link to={'/saldo'}>
          <img src={saldo} alt='' style={{width:"100px", height:"100px" }}/>
          </Link>
        </div>
        <div className={styles['boxes2']}>
          <Link to={'/transacciones'}>
          <img src={transfer} alt='' style={{width:"100px", height:"100px" }}/>
          </Link>
        </div>
        <div className={styles['boxes3']}>
          <Link to={'/prestamo'}>
          <img src={solicitud} alt='' style={{width:"100px", height:"100px" }}/>
          </Link>
        </div>
        <div className={styles['boxes4']}>
          <Link to={'/'}>
          <img src={inicio} alt='' style={{width:"100px", height:"100px" }}/>
          </Link>
        </div>
      </div>
      
      <div className={styles['container4']}>
        <Link to={'/login'}>
        <button className={styles['login-button']}>Salir</button>
        </Link>
      </div>
      <img src={design2} alt='' style={{width:"100%", height:"100px" }}/>
    </div>

  )
}*/


