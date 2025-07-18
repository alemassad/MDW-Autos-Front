import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Formato de eMail inválido",
      "string.empty": "Se requiere un eMail",
      "any.required": "Se requiere un eMail válido",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.empty": "Se requiere una contraseña",
    "any.required": "Se requiere una contraseña válida",    
  }),  
});
