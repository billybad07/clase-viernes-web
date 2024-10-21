import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo2 from './imagen/logobanco.png'
import design from './imagen/design.png'
import design2 from './imagen/design2.png'
export const Login = () => {
    return (

          <div className={styles['login-container']}>
            
            <div className={styles['boxes']}>
              <img src={design} alt='' style={{width:"100%", height:"150px" }}/>
              <img src={logo2} alt='' style={{width:"100px", height:"100px"}}/>
            </div>
            <h1>Bienvenido a Banpolombia</h1>
            <form action="" className={styles['login-form']}>
              <div className={styles['form-group']}>
                <label htmlFor="nombre">Ingresa el usuario:</label>
                <input type="text" id="nombre" className={styles['form-input']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="contraseña">Contraseña:</label>
                <input type="password" id="contraseña" className={styles['form-input']} />
              </div>
              
              <Link to={'/sesion'}>
              <button className={styles['login-button']}>Iniciar sesión</button>
              </Link>
              <Link to={'/register'}>
              <p>No tienes una cuenta?</p>
              </Link>
            </form>
            <img src={design2} alt='' style={{width:"100%", height:"100px" }}/>
          </div>

    );
  };
  
