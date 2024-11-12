import './App.css'
import { Link } from 'react-router-dom';
import logo from './assets/logo-bancolombia.jpeg';
import logo2 from './assets/logobanco.png'
import logoizquierda from './assets/izquierda.png'
import logoderecha from './assets/derecha.png'

function App() {
return(
  
    <div id="container">
      <div className="boxes1">
        <img src={logoizquierda} alt='' style={{width:"35%", height:"100%" }}/>
      </div>
      
      <div className="boxes2">
        <img src={logo} alt='' style={{width:"60%", marginRight:"6%" }}/>
        <h1>Bienvenido a banpolombia</h1>
        <p>Maneja tus finanzas con P de Polombia</p>
      
        <Link to={'/login'}>
        <button style={{marginRight:"20px", backgroundColor:"yellow"}}>Login</button>
        </Link>
      
        <Link to={'/register'}>
        <button style={{marginLeft:"20px", backgroundColor:"yellow"}}>Register</button>
      
        </Link>
        <div>
        <img src={logo2} alt='' style={{width:"100px", height:"100px"}}/>
        </div>
      </div>
      <div className="boxes3">
        <img src={logoderecha} alt='' style={{width:"25%", height:"100%"}}/>
      </div>

    
    </div>
  )
}


export default App
