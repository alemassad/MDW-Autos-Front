import Joi from "joi";

export const userIdSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "El ID debe ser hexadecimal",
      "string.length": "El ID debe tener 24 caracteres",
      "any.required": "El ID es obligatorio",
    }),
});