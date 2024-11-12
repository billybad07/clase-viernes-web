import styles from "./Register.module.css";
import logo2 from "./imagen/logobanco.png";
import design from "./imagen/design.png";
import design2 from "./imagen/design2.png";
import axios from "axios";


export const Register = () => {
    const handleRegister = async (event) => {
        // Evitar el comportamiento por defecto del formulario
        event.preventDefault();

        // Obtener valores de los inputs
        const nombre = document.getElementById("nombrereg")?.value;
        const cuenta = document.getElementById("cuentareg")?.value;
        const correo = document.getElementById("correoreg")?.value;
        const tipoCuenta = document.getElementById("categoria")?.value;
        const contraseña = document.getElementById("contraseña")?.value;
        const confContraseña = document.getElementById("confcontraseña")?.value;

        // Validar que las contraseñas coincidan
        if (contraseña !== confContraseña) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            // Realizar la petición POST
            const response = await axios.post('http://localhost:3000/registro', {
                usuario:nombre,
                email: correo,
                clave: contraseña,
                numero_cuenta: cuenta,
                tipo_cuenta:tipoCuenta
            });


            alert("Registro exitoso");
            console.log("Registro exitoso:", response.data);

        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Hubo un error al registrarse");
        }
    }


    return (
    <div className={styles["login-container"]}>

        <div className={styles["boxes"]}>
        <img src={design} alt="" style={{ width: "100%", height: "100px" }} />
        <img src={logo2} alt="" style={{ width: "100px", height: "100px" }} />
        </div>
        <h2>Bienvenido Nuevo Usuario</h2>
        <form action="" className={styles["login-form"]} onSubmit={handleRegister}>
        <div className={styles["form-group"]}>
            <label htmlFor="nombre">Usuario:</label>
            <input type="text" id="nombrereg" className="form-input" />
        </div>
        <div className={styles["form-group"]}>
            <label htmlFor="cuenta">Numero de cuenta</label>
            <input type="text" id="cuentareg" className="form-input" />
        </div>
        <div className={styles["form-group"]}>
            <label htmlFor="tipo de cuenta">Tipo de cuenta</label>
            <select id="categoria" className="form-input">
            <option value="">seleccione</option>
            <option value="ahorros">ahorros</option>
            <option value="corriente">corriente</option>
            </select>
        </div>
        {/* <div className={styles["form-group"]}>
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="Apellidoreg" className="form-input" />
        </div> */}
        <div className={styles["form-group"]}>
            <label htmlFor="correo">Correo electronico:</label>
            <input type="text" id="correoreg" className="form-input" />
        </div>
        <div className={styles["form-group"]}>
            <label htmlFor="contraseña">Contraseña:</label>
            <input type="text" id="contraseña" className="form-input" />
        </div>
        <div className={styles["form-group"]}>
            <label htmlFor="confcontraseña">Confirmar Contraseña:</label>
            <input type="text" id="confcontraseña" className="form-input" />
        </div>

        <button className={styles["login-button"]} type="submit">
            Registrarse
        </button>
        </form>
        <img src={design2} alt="" style={{ width: "100%", height: "100px" }} />
    </div>
    );
};