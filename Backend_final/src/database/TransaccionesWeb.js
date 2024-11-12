import { connectDb } from "./sql-adapter.js";

export class TransaccionesWeb {
  constructor() {
    this.connect = connectDb;
  }

  async transaccion(cuenta_id, cuentadestino_id, monto, fecha) {
    try {
        const db = await this.connect();
        const [rows] = await db.execute(
          "UPDATE usuarios SET saldo = saldo - ? WHERE numero_cuenta = ?",
          [monto, cuenta_id]);

        //Agregar a la tabla bitacora
        await db.execute(
            "INSERT  into bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?, FROM_UNIXTIME(?))",
            [cuenta_id, "transaccion", monto, fecha]
        )
        await db.execute(
          "UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?",
          [monto, cuentadestino_id]);
        await db.execute(
          "INSERT  into bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
          [cuentadestino_id, "transaccion", monto, fecha]
        )

        await db.end();
        return rows.affectedRows > 0 ?? null;
      } catch (error) {
        console.error(`Error al  realizar la transacción al usuario: ${cuentadestino_id}`, error);
        throw error;
      }
  }

  async ingreso(cuenta_id, monto) {
    try{
      const db = await this.connect();
      const fecha = Math.floor(Date.now() / 1000);
      const [rows] = await db.execute(
        "UPDATE usuarios SET saldo = saldo + ? WHERE numero_cuenta = ?",
        [monto, cuenta_id]
      );
      await db.execute(
        "INSERT  into bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
        [cuenta_id, "ingreso", monto, fecha]
      );
      await db.end();
      console.log("ROWSS",rows)
      return rows.affectedRows > 0 ?? null;
    }catch{
        console.error(`Error al  realizar el ingreso al usuario: ${cuenta_id}`, error);
        throw error;
    }
  }

  async retiro(cuenta_id, monto) {
    try{
        const fecha = Math.floor(Date.now() / 1000);
        const db = await this.connect();
        const [rows] = await db.execute(
          "UPDATE usuarios SET saldo = saldo - ? WHERE numero_cuenta = ?",
          [monto, cuenta_id]
        );
        await db.execute(
          "INSERT  into bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
          [cuenta_id, "retiro", monto, fecha]
        );
        await db.end();
        return rows.affectedRows > 0 ? true : null;
      }catch{
          console.error(`Error al  realizar el retiro al usuario: ${cuenta_id}`, error);
          throw error;
      }
  }
  async prestamo(usuario_id, monto, plazo, fecha){
    try{
      const fecha = Math.floor(Date.now() / 1000);
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
          await db.execute(
            "INSERT  into bitacora (id_cliente, tipo, monto, fecha_transaccion) VALUES(?,?,?,FROM_UNIXTIME(?))",
            [usuario_id, "prestamo", monto, fecha]
          );
        await db.end();
        return rows.affectedRows > 0 ?? null;
      } else {
        console.error('prestamo denegado, ud ya posee un prestamo con la entidad');

      }
    }
    catch{
      console.error(`Error al  realizar el deposito al usuario: ${usuario_id}`, error);
      throw error;
    }
  }
}
