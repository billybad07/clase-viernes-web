//Aquí es donde probablemente tienes la lógica de negocio para las funciones principales del banco,
// como el registro, login y las transacciones. Este archivo se encarga de manejar
// las solicitudesy coordinar con los modelos de la base de datos.
import { BancoWeb } from "../database/BancoWeb.js";
import { TransaccionesWeb } from "../database/TransaccionesWeb.js";
//clases que interactual con la base de datos
import bcrypt from 'bcrypt';
// biblioteca para hashear contraseñas, cifra o encripta las contraseñas


export class ServiciosBanco {
    //Se define la clase ServiciosBanco, que tiene un constructor 
    //que inicializa dos instancias de las clases mencionadas anteriormente.
    
    constructor(){
        this.bancoWeb = new BancoWeb();
        this.transaccionesWeb = new TransaccionesWeb();
    }

    async registroUsuarios(usuario, email, clave, numero_cuenta, tipo_cuenta){
        //Este método registra un nuevo usuario en el sistema.
        const salt = await bcrypt.genSalt(10);
        //Genera un "salt" que es un valor aleatorio usado en el hashing de la contraseña.
        clave = await bcrypt.hash(clave, salt);
        //Hashea la contraseña del usuario usando bcrypt, 
        //lo que significa que la contraseña se convierte en una cadena encriptada.
        const resultado = await this.bancoWeb.registroUsuarios(usuario, email, clave, numero_cuenta, tipo_cuenta);
        //Llama al método registroUsuarios de la instancia bancoWeb
        // para guardar los datos del usuario en la base de datos.
        return resultado;
        //Devuelve el resultado de la operación de registro.
    }

    async login(usuario, clave){
        //Este método permite a un usuario iniciar sesión en el sistema.
        const password = await this.bancoWeb.login(usuario, clave);
        //Llama al método login de bancoWeb, 
        //que debería devolver la contraseña hasheada del usuario correspondiente.
        const resultado = await bcrypt.compare(clave, password);
        //Compara la contraseña ingresada por el usuario 
        //con la contraseña almacenada (hasheada) usando bcrypt.
        return resultado;
        //Devuelve true si las contraseñas coinciden, o false si no lo hacen.
    }

    async transaccion (cuenta_id, tipo_transferencia, monto) {
        //Realizar una transacción bancaria.
        //const fecha = Date.now()
        const fecha = Math.floor(Date.now() / 1000);
        //Obtiene la fecha actual.
        let resultado;
//Dependiendo del tipo de transferencia (transferencia, depósito o retiro), 
//llama al método correspondiente de transaccionesWeb para realizar la operación.
       //if(tipo_transferencia === "transferencia"){
        //resultado = await this.transaccionesWeb.transaccion(cuenta_id, monto, fecha) 
        if(tipo_transferencia === "deposito") {
            resultado = await this.transaccionesWeb.ingreso(cuenta_id, monto, fecha) 
        } else if (tipo_transferencia === "retiro") {
            resultado = await this.transaccionesWeb.retiro(cuenta_id, monto, fecha) 
        }
        return resultado;
    }

    async prestamo (usuario_id, monto, plazo){
        const fecha = Math.floor(Date.now() / 1000);
        
        let resultado = await this.transaccionesWeb.prestamo(usuario_id, monto, plazo, fecha)


        return resultado;
    }
    async transferencia (cuenta_id, cuentadestino_id, tipo_transferencia, monto){
        //Realizar una transacción bancaria.
        //const fecha = Date.now()
        const fecha = Math.floor(Date.now() / 1000);
        //Obtiene la fecha actual.
        let resultado;
//Dependiendo del tipo de transferencia (transferencia, depósito o retiro), 
//llama al método correspondiente de transaccionesWeb para realizar la operación.
        if(tipo_transferencia === "transferencia"){
        resultado = await this.transaccionesWeb.transaccion(cuenta_id, cuentadestino_id, monto, fecha) 
        }
        /*if(tipo_transferencia === "deposito"){
        resultado = await this.transaccionesWeb.ingreso(cuenta_id, monto, fecha) 
        }else if(tipo_transferencia === "retiro"){
        resultado = await this.transaccionesWeb.retiro(cuenta_id, monto, fecha) 
        }*/
        return resultado;
    
    }
}

