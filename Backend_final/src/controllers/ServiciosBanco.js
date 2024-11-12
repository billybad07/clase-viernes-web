import { BancoWeb } from "../database/BancoWeb.js";
import { TransaccionesWeb } from "../database/TransaccionesWeb.js";
import bcrypt from 'bcrypt';


export class ServiciosBanco {
    
    constructor(){
        this.bancoWeb = new BancoWeb();
        this.transaccionesWeb = new TransaccionesWeb();
    }

    async registroUsuarios(usuario, email, clave, numero_cuenta, tipo_cuenta){
        const salt = await bcrypt.genSalt(10);
        clave = await bcrypt.hash(clave, salt);
        const resultado = await this.bancoWeb.registroUsuarios(usuario, email, clave, numero_cuenta, tipo_cuenta);
        return resultado;
    }

    async login(usuario, clave){
        const password = await this.bancoWeb.login(usuario, clave);
        const resultado = await bcrypt.compare(clave, password.clave);
        if (resultado){return password.id;}
        
    }

    async transaccion (cuenta_id, tipo_transferencia, monto) {
        const fecha = Math.floor(Date.now() / 1000);
        let resultado;

 
        if(tipo_transferencia === "deposito"){
            resultado = await this.transaccionesWeb.ingreso(cuenta_id, monto, fecha) 
        }else if(tipo_transferencia === "retiro"){
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

        const fecha = Math.floor(Date.now() / 1000);
        
        let resultado;

        if(tipo_transferencia === "transferencia"){
        resultado = await this.transaccionesWeb.transaccion(cuenta_id, cuentadestino_id, monto, fecha) 
        }

        return resultado;
    
    }

}

