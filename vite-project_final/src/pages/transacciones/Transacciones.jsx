import styles from './Transacciones.module.css';
import { Link } from 'react-router-dom';
import saldo from './imagensesion/saldosmovi.jpg'
import transfer from './imagensesion/transdine.jpg'
import solicitud from './imagensesion/solicitud.png'
import design from './imagensesion/design.png'
import inicio from './imagensesion/inicio.jpg'
import design2 from './imagensesion/design2.png'
import axios from "axios";



export const Transacciones = () => {
  const handletransfer = async (event) => {
    // Evitar el comportamiento por defecto del formulario
    event.preventDefault();

    // Obtener valores de los inputs
    const cuenta = document.getElementById("cuenta")?.value;
    const tipoCuenta = document.getElementById("transfer")?.value;
    const nmonto = document.getElementById("monto")?.value;
    
    
    
    

    // Validar que las contraseñas coincidan
    /*if (contraseña !== confContraseña) {
        alert("Las contraseñas no coinciden");
        return;
    }*/

    try {
        // Realizar la petición POST
        const response = await axios.post('http://localhost:3000/transaccion', {
            cuenta_id:cuenta,
            tipo_transferencia: tipoCuenta,
            monto: nmonto,

        });


        alert("Transaccion exitosa");
        console.log("Transaccion exitosa:", response.data);

    } catch (error) {
        console.error("Error en la Transaccion:", error);
        alert("Hubo un error en la Transacion");
    }
  }

  return (
    <div className={styles['container']}>
      <img src={design} alt='' style={{width:"100%", height:"100px" }}/>
      <h1>Hola!</h1>
      <div className={styles['container2']}>
        
        <form action="" className={styles['login-form']} onSubmit={handletransfer}>
              <div className={styles['form-group']}>
                <label htmlFor="cuenta"><p><strong>Numero de cuenta destino:</strong></p></label>
                <input type="text" id="cuenta" className={styles['form-input']} />
                
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="tranfer"><p><strong>tipo transferencia</strong></p></label>
                <select id="transfer" className="form-input">
                  <option value="">seleccione</option>
                  <option value="deposito">deposito</option>
                  <option value="retiro">retiro</option>
                  
                </select>
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="monto"><p><strong>Monto</strong></p></label>
                <input type="text" id="monto" className={styles['form-input']} />
              <br />
              </div>
              <button className={styles["login-button"]} type="submit">
                Transferir
              </button>
              
        </form>
        
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
          <Link to={'/sesion'}>
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
}