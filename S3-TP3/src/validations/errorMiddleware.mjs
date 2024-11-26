// src/validations/errorMiddleware.js
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
          status: 'error',
          message: 'Falló la validación',
          errors: errors.array().map(error => ({
                Campo: error.path,  
                Valor: error.value,
                Mensaje: error.msg,
          }))
      });
    }
    next();
  };