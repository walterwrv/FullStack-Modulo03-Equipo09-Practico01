// src/validations/errorMiddleware.js
import { validationResult } from 'express-validator';


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    const datosHeroe = {...req.body, 
      poderes: req.body.poderes.join(','), //tranformo de array a string
      aliados: req.body.aliados.join(','), //tranformo de array a string
      enemigos: req.body.enemigos.join(',') //tranformo de array a string
    };
    // console.log('poderes ', typeof datosHeroe.poderes);
    return res.status(400).render('paginas/addSuperhero', {
        errors: errors.array(),
        datosHeroe,
        title: 'agregar superheroe',
    });
  }
  next();
};

export const handleValidationErrorsEditar = (req, res, next) => {
  const errors = validationResult(req);

  // console.log('estoy en errorMiddleware con error ',errors);
  if (!errors.isEmpty()) {
    if (req.headers['content-type'] === 'application/json') {
        // Si es una solicitud fetch, devolver errores en JSON
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    // Si no es fetch, renderizar la vista con errores
    /*const datosHeroe = req.body;
    datosHeroe._id = req.params.id; // Mantener el ID

    return res.status(400).render('editSuperhero', {
        errors: errors.array(),
        datosHeroe,
    });*/
}
  
  next();
};