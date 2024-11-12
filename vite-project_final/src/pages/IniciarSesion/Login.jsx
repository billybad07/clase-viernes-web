import styles from './Login.module.css';
import { Link, Navigate } from 'react-router-dom';
import logo2 from './imagen/logobanco.png'
import design from './imagen/design.png'
import design2 from './imagen/design2.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  
  // Paso 2: Función para obtener el saldo del usuario después de iniciar sesión
  const obtenerSaldo = async (userId) => {
    console.log("UserId:", userId); 
    try {
      const response = await axios.get(`http://localhost:3000/obtusuario/${userId}`);
      if (response.data && response.data.data) {
        // Aquí tienes los datos del usuario, incluyendo el saldo
        const usuario = response.data.data.usuario;
        const saldo = response.data.data.saldo;
        const numero_cuenta = response.data.data.numero_cuenta;
        localStorage.setItem("numero_cuenta", numero_cuenta);
        alert(`Bienvenido ${usuario}, tu saldo es: ${saldo}, numero de cuenta es: ${numero_cuenta}`);
        console.log(`Bienvenido ${usuario}, tu saldo es: ${saldo},  numero de cuenta es: ${numero_cuenta}`);
        // Redirigir al usuario a su página de cuenta o dashboard
        navigate('/sesion');  // Cambia a la ruta donde quieras redirigir al usuario
      } else {
        alert("No se encontró información del usuario");
      }
    } catch (error) {
      console.error("Error al obtener el saldo:", error);
      alert("Hubo un error al obtener el saldo");
    }
  };

  
  const handlelogin = async (event) => {
    event.preventDefault();
  
    // Obtener valores de los inputs
    const usuario = document.getElementById("nusuario")?.value;
    const contraseña = document.getElementById("contraseña")?.value;
  
    try {
      // Realizar la petición POST
      const response = await axios.post('http://localhost:3000/login', {
        usuario: usuario,
        clave: contraseña,
      });
  
      // Verificar si la respuesta contiene los datos
      if (response.data && response.data.data) {
        const userId = response.data.data;  // Obtener el ID del usuario desde la respuesta del backend
  
        // Verificar que userId no sea undefined o nulo
        if (userId) {
          alert("Sesión Exitosa");

          // Guardar el ID del usuario en localStorage para acceder después
          localStorage.setItem("userId", userId);  // Esto guarda el ID en el almacenamiento local
  
          // Llamar a la función para obtener el saldo del usuario
          obtenerSaldo(userId);
  
          // Redirigir a la página de sesión o dashboard
          navigate('/sesion');
        } else {
          alert("No se pudo obtener el ID del usuario");
        }
      } else {
        alert("Credenciales inválidas");
      }
  
      console.log("Sesión Exitosa:", response.data);
    } catch (error) {
      console.error("Error en la sesión:", error);
      alert("Hubo un error al iniciar sesión");
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['boxes']}>
        <img src={design} alt='' style={{ width: "100%", height: "150px" }} />
        <img src={logo2} alt='' style={{ width: "100px", height: "100px" }} />
      </div>
      <h1>Bienvenido a Banpolombia</h1>
      <form action="" className={styles['login-form']} onSubmit={handlelogin}>
        <div className={styles['form-group']}>
          <label htmlFor="nombre">Ingresa el usuario:</label>
          <input type="text" id="nusuario" className={styles['form-input']} />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" id="contraseña" className={styles['form-input']} />
        </div>
        <button className={styles["login-button"]} type="submit">
          Iniciar Sesión
        </button>
      </form>
      <Link to={'/register'}>
        <p>No tienes una cuenta?</p>
      </Link>
      <img src={design2} alt='' style={{ width: "100%", height: "100px" }} />
    </div>
  );
};
