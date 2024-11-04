/*El código que compartiste define dos esquemas de validación utilizando la 
biblioteca Joi, que es ampliamente utilizada en aplicaciones Node.js 
para validar datos de entrada. A continuación, haré un desglose de cada uno
 de los esquemas:*/
import Joi from "joi";
//Joi: Se importa la biblioteca Joi para crear esquemas de validación.
export const registroSchema = Joi.object({
  //Propósito: Este esquema valida los datos necesarios para registrar un nuevo usuario en el sistema.
  usuario: Joi.string().min(3).max(16).required(),
  //usuario: Debe ser una cadena de texto con una longitud mínima de 3 caracteres
  // y máxima de 16 caracteres. Es obligatorio.
  email: Joi.string().email().required(),
  //email: Debe ser una cadena que cumpla
  // con el formato de un correo electrónico. Es obligatorio.
  clave: Joi.string().min(5).required(),
  //clave: Debe ser una cadena con una longitud mínima de 5 caracteres. Es obligatorio.
  numero_cuenta: Joi.number().integer().max(9999999999).required(),
  /*numero_cuenta: Debe ser un número entero que no exceda 
  el valor 9999999999. Es obligatorio.*/
  tipo_cuenta: Joi.string().required(),
  //tipo_cuenta: Debe ser una cadena de texto. Es obligatorio.
});

export const transaccionSchema = Joi.object({
  cuenta_id: Joi.number().integer().max(9999999999).required(),
  tipo_transferencia: Joi.string().required(),
  monto: Joi.number().required(),
});
