import Joi from "joi";
export const categoryIdSchema = Joi.object({
  autoId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "El ID debe ser hexadecimal",
      "string.length": "El ID debe tener 24 caracteres",
      "any.required": "El ID es obligatorio",
    }),
});

export const categoryEditSchema = Joi.object({ 

  name: Joi.string().min(2).max(20).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar 50 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  description: Joi.string().min(3).max(500).required().messages({
    "string.empty": "La descripción es obligatoria",
    "string.min": "La descripción debe tener al menos 3 caracteres",
    "string.max": "La descripción no puede superar 500 caracteres",
    "any.required": "La descripción es obligatoria",
  }),
  isActive: Joi.boolean().optional(),
});
