import Joi from 'joi';

const categoryIdSchema = Joi.object({
  categoryId: Joi.string().hex().length(24).required().messages({
    "string.hex": "El ID debe ser hexadecimal",
    "string.length": "El ID debe tener 24 caracteres",
    "any.required": "El ID es obligatorio",
  }),
});
export default categoryIdSchema;