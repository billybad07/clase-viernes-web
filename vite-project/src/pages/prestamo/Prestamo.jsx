import styles from './Prestamo.module.css';
import { Link } from 'react-router-dom';
import saldo from './imagensesion/saldosmovi.jpg'
import transfer from './imagensesion/transdine.jpg'
import solicitud from './imagensesion/solicitud.png'
import design from './imagensesion/design.png'
import inicio from './imagensesion/inicio.jpg'
import design2 from './imagensesion/design2.png'



export const Prestamo = () => {

  return (
    <div className={styles['container']}>
      <img src={design} alt='' style={{width:"100%", height:"100px" }}/>
      <h1>hola usuario</h1>
      <div className={styles['container2']}>
        <div><h1><n></n>Muy Embalado?</h1></div>
      </div>
        
      
      <div className={styles['container3']}>
      
        <div className={styles['boxes1']}>
          <img src={saldo} alt='' style={{width:"100px", height:"100px" }}/>
        </div>
        <div className={styles['boxes2']}>
          <img src={transfer} alt='' style={{width:"100px", height:"100px" }}/>
        </div>
        <div className={styles['boxes3']}>
          <img src={solicitud} alt='' style={{width:"100px", height:"100px" }}/>
        </div>
        <div className={styles['boxes4']}>
        <img src={inicio} alt='' style={{width:"100px", height:"100px" }}/>
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