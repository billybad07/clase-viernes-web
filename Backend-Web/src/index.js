//Este código es bastante sencillo y se encarga de iniciar el servidor 
//de la aplicación Express que has configurado anteriormente. Vamos a desglosar cada parte:
import app from './app.js';

const main = () =>{
    app.listen(app.get('port'))
    console.log("Escuchando al puerto", app.get('port'))
}

main();