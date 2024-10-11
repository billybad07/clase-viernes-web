import './App.css'
import { Link } from 'react-router-dom';
import logo from './assets/logo-bancolombia.jpeg';

function App() {
return(
    <div>
      <img src={logo} alt='' style={{width:"40%", marginRight:"6%"}}/>
      <h1>Bienvenido a banpolombia</h1>
      <p>Maneja tus finanzas con P de Polombia</p>
      
      <Link to={'/login'}>
      <button style={{marginRight:"20px"}}>Login</button>
      </Link>
      
      <Link to={'/register'}>
      <button style={{marginLeft:"20px"}}>Register</button>
      </Link>

    </div>
  )
}

export default App
