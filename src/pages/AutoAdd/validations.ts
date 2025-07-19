import Joi from "joi";

export const autoAddSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
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
  amount: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock debe ser un número",
    "number.min": "El stock no puede ser negativo",
    "any.required": "El stock es obligatorio",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "El precio debe ser un número",
    "number.min": "El precio no puede ser negativo",
    "any.required": "El precio es obligatorio",
  }),
  image: Joi.string().uri().allow("").messages({
    "string.uri": "La imagen debe ser una URL válida",
  }),
  ownerId: Joi.string().hex().length(24).optional().allow("").messages({
    "string.hex": "El ID de propietario debe ser hexadecimal",
    "string.length": "El ID de propietario debe tener 24 caracteres",
  }),
  category: Joi.string().hex().length(24).optional().allow("").messages({
    "string.hex": "El ID de categoría debe ser hexadecimal",
    "string.length": "El ID de categoría debe tener 24 caracteres",
  }),
  isActive: Joi.boolean().optional(),
});