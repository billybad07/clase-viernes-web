import app from './app.js';

const main = () =>{
    app.listen(app.get('port'))
    console.log("Escuchando al puerto", app.get('port'))
}

main();