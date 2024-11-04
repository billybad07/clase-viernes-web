import { ServiciosBanco } from "../controllers/ServiciosBanco.js";
import { registroSchema, transaccionSchema } from "./util/schema.js";

const servicioBanco = new ServiciosBanco();
//Se crea una instancia de ServiciosBanco, que se usará para manejar
// las operaciones en las funciones de los controladores.

export const registroRouter = async (req, res) => {
  //Función: Maneja la solicitud de registro de un nuevo usuario.
  try {
    const { usuario, email, clave, numero_cuenta, tipo_cuenta } =
      await registroSchema.validateAsync(req.body);
      //Valida los datos de entrada utilizando registroSchema.
    const resultado = await servicioBanco.registroUsuarios(
      //Llama al método registroUsuarios de ServiciosBanco para registrar al usuario.
      usuario,
      email,
      clave,
      numero_cuenta,
      tipo_cuenta
    );
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", data: resultado });
      //Si se registra con éxito, responde con un código 201 y un mensaje de éxito.
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: e.message });
      //En caso de error, responde con un código 500 y un mensaje de error.
  }
};
// Maneja la solicitud de inicio de sesión.
export const loginRouter = async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    //Extrae usuario y clave del cuerpo de la solicitud.
    const resultado = await servicioBanco.login(usuario, clave);
    //Llama al método login de ServiciosBanco.
    resultado
      ? res
          .status(200)
          .json({ message: "Inicio de sesión exitoso", data: resultado })
          //Si el inicio de sesión es exitoso, responde con un código 200 y un mensaje de éxito.
      : res.status(401).json({ message: "Credenciales incorrectas" });
      //Si las credenciales son incorrectas, responde con un código 401.
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: e.message });
      //En caso de error, responde con un código 500 y un mensaje de error.
  }
};
//Maneja la solicitud de realizar una transacción.
export const transaccionRouter = async (req, res) => {
  try{
    const { cuenta_id, tipo_transferencia, monto } = await req.body;
    //await transaccionSchema.validateAsync(req.body);
    //Valida los datos de entrada utilizando transaccionSchema.
    const resultado = await servicioBanco.transaccion(cuenta_id, tipo_transferencia, monto);
    //Llama al método transaccion de ServiciosBanco.
    
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
//Función: Maneja la solicitud de un préstamo.
export const prestamoRouter = async (req, res) => {
  try{
    const { usuario_id, monto, plazo } = req.body;
    //Extrae usuario_id, monto y plazo del cuerpo de la solicitud.
    const resultado = await servicioBanco.prestamo(usuario_id, monto, plazo);
    //Llama al método prestamo de ServiciosBanco.
    resultado ?
    res.status(200).json({message:"Prestamo efectuado con exito"})
    : res.status(400).json({message:"prestamo denegado, ud ya posee un prestamo con la entidad"}) 
    //Responde con un código 200 y un mensaje de éxito si el préstamo se otorga
    // correctamente; de lo contrario, responde con un código 400 en caso de error.
  }
  catch(e){
    console.log(e)
    res.status(500).json({message:"Error en el prestamo", error: e.message})
    //En caso de errores durante la ejecución, responde con un código 500 y un mensaje de error.
  }
};
export const transferenciaRouter = async (req, res) => {
  try {
    const { cuenta_id, cuentadestino_id, tipo_transferencia, monto } = req.body;
    //Valida los datos de entrada utilizando transaccionSchema.
    const resultado = await servicioBanco.transferencia(cuenta_id, cuentadestino_id, tipo_transferencia, monto);
    //Llama al método transaccion de ServiciosBanco.
    
    return resultado
      ? res.status(200).json({message: `Transacción de tipo ${tipo_transferencia} realizada con exito`})
      : res.status(500).json({ message: "Error en la transacción" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error en la transacción", error: e.message });
  }
};
