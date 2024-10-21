import styles from './Register.module.css';
import logo2 from './imagen/logobanco.png';
import design from './imagen/design.png'
import design2 from './imagen/design2.png'
import { Link } from 'react-router-dom';

export const Register = () => {
    return (
        <div className={styles['login-container']}>
        
            <div className={styles['boxes']}>
                <img src={design} alt='' style={{width:"100%", height:"100px" }}/>
                <img src={logo2} alt='' style={{width:"100px", height:"100px"}}/>
            </div>
            <h2>Bienvenido Nuevo Usuario</h2>
            <form action="" className={styles['login-form']}>
                <div className={styles["form-group"]}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombrereg" className="form-input"/>
                </div>
        
                <div className={styles["form-group"]}>
                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="Apellidoreg" className="form-input" />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="correo">Correo electronico:</label> 
                    <input type="text" id="correoreg" className="form-input"/>
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input type="text" id="contraseña" className="form-input" />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="confcontraseña">Confirmar Contraseña:</label>
                    <input type="text" id="confcontraseña" className="form-input" />
                </div>
                <Link to={'/login'}>
                <button className={styles['login-button']}>Registrarse</button>
                </Link>

            </form>
            <img src={design2} alt='' style={{width:"100%", height:"100px" }}/>
        </div>
    )
}