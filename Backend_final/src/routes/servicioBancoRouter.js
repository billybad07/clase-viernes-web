import { ServiciosBanco } from "../controllers/ServiciosBanco.js";
import { registroSchema, transaccionSchema } from "./util/schema.js";
import { connectDb } from "../database/sql-adapter.js";  

const servicioBanco = new ServiciosBanco();

export const registroRouter = async (req, res) => {
  try {
    const { usuario, email, clave, numero_cuenta, tipo_cuenta } =
      await registroSchema.validateAsync(req.body);
    const resultado = await servicioBanco.registroUsuarios(
      usuario,
      email,
      clave,
      numero_cuenta,
      tipo_cuenta
    );
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", data: resultado });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: e.message });
  }
};

export const loginRouter = async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    const resultado = await servicioBanco.login(usuario, clave);
    resultado
      ? res
          .status(200)
          .json({ message: "Inicio de sesión exitoso", data: resultado })
      : res.status(401).json({ message: "Credenciales incorrectas" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: e.message });
  }
};

export const transaccionRouter = async (req, res) => {
  try {
    const {cuenta_id, tipo_transferencia, monto } = await transaccionSchema.validateAsync(req.body);
  const resultado = await servicioBanco.transaccion(
    cuenta_id,
    tipo_transferencia,
    monto
  );
  return resultado ?
  res.status(200).json({message: `Transacción de tipo ${tipo_transferencia} realizada con exito`})
  : res.status(500).json({ message: "Error en la transacción" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error en la transacción", error: e.message });
  }
};

export const prestamoRouter = async (req, res) => {
  try{
    const { usuario_id, monto, plazo } = req.body;
    const resultado = await servicioBanco.prestamo(usuario_id, monto, plazo);
    resultado ?
    res.status(200).json({message:"Prestamo efectuado con exito"})
    : res.status(400).json({message:"prestamo denegado, ud ya posee un prestamo con la entidad"}) 
  }
  catch(e){
    console.log(e)
    res.status(500).json({message:"Error en el prestamo", error: e.message})
  }
};
export const transferenciaRouter = async (req, res) => {
  try {
    const { cuenta_id, cuentadestino_id, tipo_transferencia, monto } = req.body;
  
    const resultado = await servicioBanco.transferencia(cuenta_id, cuentadestino_id, tipo_transferencia, monto);
    
    
    return resultado
      ? res.status(200).json({message: `Transacción de tipo ${tipo_transferencia} realizada con exito`})
      : res.status(500).json({ message: "Error en la transacción" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error en la transacción", error: e.message });
  }
};

///////////////DEFINIENDO RUTAS GET ///////////////////
////
export const traersaldousuario = async (req, res) => {
  try {
    
    const db = await connectDb();  
    const id = req.params.id

    const [results] = await db.execute('SELECT usuario, saldo, numero_cuenta  FROM usuarios WHERE id = ?',
    [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    

    
    res.status(200).json({
      message: "Usuarios registrados:",
      data: results[0], 
    });

    
    await db.end(); 
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al obtener información de registro", error: e.message });
  }
};
////////////////////////////////////////////consultar bitacora//////
export const traerBitacora = async (req, res) => {
  const db = await connectDb();  // Usamos la conexión asíncrona
  try {
    
    // Validar el parámetro id_cliente
    const id_cliente = req.params.id_cliente;
    if (!id_cliente) {
      return res.status(400).json({ message: "id_cliente es requerido" });
    }

    // Establecer la conexión a la base de datos
    

    // Hacer una consulta a la base de datos para traer información de la tabla "bitacora" filtrada por id_cliente
    const [results] = await db.execute('SELECT * FROM bitacora WHERE id_cliente = ?', [id_cliente]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "No se encontraron registros para el id_cliente proporcionado" });
    }

    // Si la consulta es exitosa, se devuelve la información de la bitácora
    res.status(200).json({
      message: "Registros de la bitácora:",
      data: results, // Aquí 'results' contiene los datos filtrados de la tabla "bitacora"
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al obtener información de la bitácora", error: e.message });
  } finally {
    // Cerramos la conexión después de realizar la consulta
    if (db) {
      await db.end(); // Cierra la conexión a la base de datos
    }
  }
};