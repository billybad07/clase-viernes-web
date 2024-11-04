//contienen las funciones para interactuar con la base de datos MySQL
import { connectDb } from "./sql-adapter.js";

export class BancoWeb {
  //La clase BancoWeb que compartiste es responsable de interactuar 
  //con la base de datos para gestionar usuarios en tu sistema bancario. 
  constructor() {
    this.connect = connectDb;
    //Constructor: Se inicializa la clase y se asigna la función connectDb a this.connect,
    // permitiendo que se use para conectarse a la base de datos en otros métodos.
  }

  async registroUsuarios(usuario, email, clave, numero_cuenta, tipo_cuenta) {
    // Este método registra un nuevo usuario en la base de datos.
    try {
      const db = await this.connect();
      //Se intenta conectar a la base de datos utilizando this.connect().
      const [rows] = await db.execute(

        "INSERT INTO usuarios (usuario, email, clave, numero_cuenta, tipo_cuenta) VALUES (?, ?, ?, ?, ?)",
        [usuario, email, clave, numero_cuenta, tipo_cuenta]
      );
              //Se ejecuta una consulta SQL para insertar un nuevo usuario 
        //en la tabla usuarios con los datos proporcionados.
      await db.end();
      //Se cierra la conexión a la base de datos con db.end().
      return rows.insertId ?? null;
      //Devuelve el insertId, que es el ID del nuevo registro insertado, o null si no se insertó nada.
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
      //Si ocurre un error, se captura y se muestra un mensaje en la consola, y luego se lanza el 
      //error para que pueda ser manejado en el lugar donde se llamó al método.
    }
  }

  async login(usuario) {
    // Este método permite a un usuario iniciar sesión al recuperar
    // su clave de la base de datos.
    try {
      const db = await this.connect();
      //Se intenta conectar a la base de datos.
      const [clave] = await db.execute(
        "SELECT clave FROM usuarios WHERE usuario = ?",
        [usuario]
        //Se ejecuta una consulta SQL para seleccionar la columna clave de la
        // tabla usuarios donde el nombre del usuario coincide con el proporcionado.
      );
      await db.end();//Se cierra la conexión a la base de datos.
      return clave[0].clave ?? null;
      //Devuelve la clave del usuario, o null si no se encuentra el usuario.
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
      //En caso de error, se muestra un mensaje en la consola y se lanza el error.
    }
  }
}/*La clase BancoWeb proporciona dos funcionalidades principales:
Registro de Usuarios: Permite añadir nuevos usuarios a la base de datos.
Inicio de Sesión: Permite recuperar la clave de un usuario específico para validar sus credenciales.*/
