//contienen las funciones para interactuar con la base de datos MySQL
import { connectDb } from "./sql-adapter.js";
//connectDb: Este es un módulo que permite establecer una
// conexión a la base de datos, tal como en la clase anterior.


/*La clase TransaccionesWeb que compartiste gestiona las transacciones 
bancarias de los usuarios, incluyendo ingresos, retiros y 
la actualización del saldo en la base de datos. A continuación, haré un desglose
 detallado de cada parte de esta clase y su funcionalidad.*/
export class TransaccionesWeb {
  constructor() {
    this.connect = connectDb;
  }
  /*Constructor: Similar a BancoWeb, aquí se asigna la función connectDb a this.connect,
   lo que permite realizar conexiones a la base de datos en los métodos posteriores.*/

  async transaccion(cuenta_id, cuentadestino_id, monto, fecha) {
    //Propósito: Realizar una transacción (incrementar el saldo de un usuario)
    // y registrar la acción en una tabla de bitácora.
    try {
        const db = await this.connect();//Conecta a la base de datos.

        const [rows] = await db.execute(
          "UPDATE usuarios SET saldo = saldo - ? WHERE numero_cuenta = ?",
          [monto, cuenta_id]);
        await db.execute(
          "INSERT  into tabla_bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
          [cuenta_id, "transaccion", monto, fecha]
        )

          //Ejecuta una consulta SQL 
          //para actualizar el saldo del usuario identificado por numero_cuenta.

        //Agregar a la tabla bitacora
        //Inserta un registro en la tabla tabla_bitacora para llevar un seguimiento
        // de la transacción realizada (incluyendo el tipo de transacción y la fecha).
        await db.execute(
          "UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?",
          [monto, cuentadestino_id]);
        await db.execute(
          "INSERT  into tabla_bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
          [cuentadestino_id, "transaccion", monto, fecha]
        )
      

        await db.end();//Cierra la conexión a la base de datos.
        return rows.affectedRows > 0 ?? null;
        //Devuelve true si se afectaron filas, lo que indica que la
        // operación fue exitosa, o null si no se afectaron filas.
      } catch (error) {
        console.error(`Error al  realizar la transacción al usuario: ${cuentadestino_id}`, error);
        throw error;
        //Captura y maneja cualquier error que ocurra.
      }
  }
//Propósito: Realiza un ingreso (incremento del saldo) en la cuenta del usuario.
  async ingreso(cuenta_id, monto) {
    try {
        const fecha = Math.floor(Date.now() / 1000); // Obtiene la fecha actual en formato UNIX (segundos)
        const db = await this.connect();//Conecta a la base de datos.
        const [rows] = await db.execute(
          "UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?",
          [monto, cuenta_id]
        );
        await db.execute(
          "INSERT  into tabla_bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
          [cuenta_id, "ingreso", monto, fecha]
        );
        //Ejecuta una consulta SQL similar a la del método 
        //transaccion para actualizar el saldo del usuario.
        await db.end();//Cierra la conexión.
        console.log("ROWSS",rows)
        return rows.affectedRows > 0 ? true : null;
      //Devuelve true si se afectaron filas, o null si no.
    } catch (error) {
      //Captura y maneja cualquier error.
        console.error(`Error al  realizar el ingreso al usuario: ${cuenta_id}`, error);
        throw error;
    }
  }
//Propósito: Realiza un retiro (decremento del saldo) en la cuenta del usuario.
  async retiro(cuenta_id, monto) {
    try {
        const fecha = Math.floor(Date.now() / 1000);
        const db = await this.connect();
        const [rows] = await db.execute(
          "UPDATE usuarios SET saldo = saldo - ? WHERE numero_cuenta = ?",
          [monto, cuenta_id]
        );
        await db.execute(
          "INSERT  into tabla_bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
          [cuenta_id, "retiro", monto, fecha]
        );
          //Ejecuta una consulta SQL para reducir el saldo del usuario según el monto indicado.
        await db.end();//Cierra la conexión.
        return rows.affectedRows > 0 ? true : null;//Devuelve true si se afectaron filas, o null si no.
    } catch (error) {//Captura y maneja cualquier error.
          console.error(`Error al  realizar el retiro al usuario: ${cuenta_id}`, error);
          throw error;
    }
  }
  async prestamo(usuario_id, monto, plazo, fecha){
    try{
      const db = await this.connect()
      const [consaldo] = await db.execute(
        "SELECT monto FROM prestamo WHERE usuario_id = ?",
        [usuario_id]
      );
      if (consaldo <= 0) {

      
        const [rows] = await db.execute(
          "UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?",
          [monto, usuario_id]);

          await db.execute(
            "INSERT  into prestamo (usuario_id, monto, plazo, fecha) VALUES(?,?,?,FROM_UNIXTIME(?))",
            [usuario_id, monto, plazo, fecha]
          );
        await db.end();
        return rows.affectedRows > 0 ?? null;
      } else {
        console.error('prestamo denegado, ud ya posee un prestamo con la entidad');

      }
    }
    catch{
      console.error(`Error al  realizar el deposito al usuario: ${usuario}`, error);
      throw error;
    }
  }
}
