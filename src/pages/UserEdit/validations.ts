import Joi from "joi";

export const userEditSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede superar 50 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  lastname: Joi.string().min(3).max(50).required().messages({
    "string.empty": "El apellido es obligatorio",
    "string.min": "El apellido debe tener al menos 3 caracteres",
    "string.max": "El apellido no puede superar 50 caracteres",
    "any.required": "El apellido es obligatorio",
  }),
  birthdate: Joi.date().iso().required().messages({
    "date.base": "La fecha de nacimiento es inválida",
    "any.required": "La fecha de nacimiento es obligatoria",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Formato de eMail inválido",
    "string.empty": "Se requiere un eMail",
    "any.required": "Se requiere un eMail válido",
  }),
  isAdmin: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
});