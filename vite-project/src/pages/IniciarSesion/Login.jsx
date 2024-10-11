import styles from './Login.module.css';
import { Link } from 'react-router-dom';
export const Login = () => {
    return (
      <div className={styles['login-container']}>
        <h1>Bienvenido a Bancolombia</h1>
        <form action="" className={styles['login-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" className={styles['form-input']} />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" className={styles['form-input']} />
          </div>
          <button className={styles['login-button']}>Iniciar sesión</button>
          <Link to={'/register'}>
          <p>No tienes una cuenta?</p>
          </Link>
        </form>
      </div>
    );
  };
  
