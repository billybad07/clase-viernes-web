import styles from './Prestamo.module.css';
import { Link } from 'react-router-dom';
import saldo from './imagensesion/saldosmovi.jpg'
import transfer from './imagensesion/transdine.jpg'
import solicitud from './imagensesion/solicitud.png'
import design from './imagensesion/design.png'
import inicio from './imagensesion/inicio.jpg'
import design2 from './imagensesion/design2.png'
import axios from "axios";


export const Prestamo = () => {
  const userId = localStorage.getItem("userId");
  const handleprestamob = async (event) => {
    // Evitar el comportamiento por defecto del formulario
    event.preventDefault();

    // Obtener valores de los inputs
    const usuarioid = document.getElementById("cuenta")?.value;
    const nmonto = document.getElementById("monto")?.value;
    const plazo = document.getElementById("plazo")?.value;

    console.log(userId);
    
    
    


    try {
        // Realizar la petición POST
        const response = await axios.post('http://localhost:3000/prestamo', {
            usuario_id:usuarioid,
            monto: nmonto,
            plazo: plazo,
            

        });


        alert("Prestamo exitoso");
        console.log("Prestamo exitoso:", response.data);

    } catch (error) {
        console.error("Error en la Prestamo:", error);
        alert("Hubo un error en el Prestamo");
    }
  }

  return (
    <div className={styles['container']}>
      <img src={design} alt='' style={{width:"100%", height:"100px" }}/>
      <h1>hola usuario</h1>
      <div className={styles['container2']}>
      <form action="" className={styles['login-form']} onSubmit={handleprestamob}>
              <div className={styles['form-group']}>
                <label htmlFor="cuenta"><p><strong>Cuenta usuario</strong></p></label>
                <input type="text" id="cuenta" className={styles['form-input']} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="monto"><p><strong>Monto</strong></p></label>
                <input type="text" id="monto" className={styles['form-input']} />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="plazo"><p><strong>Plazo</strong></p></label>
                <select id="plazo" className="form-input">
                  <option value="">meses</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                  
                  
                </select>
              </div>
              <button className={styles["login-button"]} type="submit">
                Solicitar Prestamo
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