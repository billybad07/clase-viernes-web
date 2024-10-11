import styles from './Register.module.css';

export const Register = () => {
    return (
        <div className={styles['login-container']}>
            <h1>Bienvenido Nuevo Usuario</h1>
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
                <button className="login-button">Registrarse</button>
            </form>
        </div>
    )
}