import Joi from "joi";

export const registroSchema = Joi.object({
  usuario: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  clave: Joi.string().min(5).required(),
  numero_cuenta: Joi.number().integer().max(9999999999).required(),
  tipo_cuenta: Joi.string().required(),
});

export const transaccionSchema = Joi.object({
  cuenta_id: Joi.number().integer().max(9999999999).required(),
  tipo_transferencia: Joi.string().required(),
  monto: Joi.number().required(),
});
