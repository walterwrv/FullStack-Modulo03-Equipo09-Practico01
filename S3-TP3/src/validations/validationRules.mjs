    import { body, param } from 'express-validator';
    import mongoose from 'mongoose';

    function validarObjectId(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }

    // Reglas para crear un superhéroe
    export const insertarSuperheroeValidationRules = () => {
        return [
        // Validación para nombreSuperHeroe
        body('nombreSuperHeroe')
            .trim()//limpia espacios en blanco al principio y/o al final del nombre
            .notEmpty().withMessage('El nombre del superhéroe es requerido')
            .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),
    
        // Validación para nombreReal
        body('nombreReal')
            .trim()
            .notEmpty().withMessage('El nombre real es requerido')
            .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
    
        // Validación para edad
        body('edad')
            .notEmpty().withMessage('La edad es requerida')
            .isNumeric().withMessage('La edad debe ser un número')
            .custom(value => value >= 0).withMessage('La edad no puede ser negativa'),
    
        // Validación para poder (debe ser un array con los requisitos dados)
        body('poderes')
            .exists({ checkFalsy: true }).withMessage('El campo poderes es requerido')
            .isArray({ min: 1 }).withMessage('El campo poderes debe ser un arreglo con al menos un elemento')
            .custom(value => value.every(item => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60))
            .withMessage('Cada poder debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),
        
        body('aliados')
            .exists({ checkFalsy: true }).withMessage('El campo aliados es requerido')
            .isArray({ min: 1 }).withMessage('El campo aliados debe ser un arreglo con al menos un elemento')
            .custom(value => value.every(item => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60))
            .withMessage('Cada aliado debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),
        
        body('enemigos')
            .exists({ checkFalsy: true }).withMessage('El campo enemigos es requerido')
            .isArray({ min: 1 }).withMessage('El campo enemigos debe ser un arreglo con al menos un elemento')
            .custom(value => value.every(item => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60))
            .withMessage('Cada enemigo debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),
    
        ];
    };


    // Reglas para actualizar un superhéroe
    export const actualizarSuperheroeValidationRules = () => {
        // console.log('estoy en actualizarSuperheroeValidationRules');
        return [
        param('id')
            .custom(validarObjectId)
            .withMessage('El ID debe ser un ObjectId válido'),

        body('nombreSuperHeroe')
            .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
            .isString()
            .notEmpty()
            .withMessage('El nombre del superhéroe debe ser una cadena no vacía'),
    
        body('edad')
            .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
            .isInt({ min: 0 })
            .withMessage('La edad debe ser un número positivo'),
    
        body('poderes')
            .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
            .isArray()
            .withMessage('Los poderes deben ser una lista')
            .custom((value) => {
            if (value.length === 0) {
                throw new Error('Los poderes no pueden estar vacíos');
            }
            return value.every((item) => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60);
            })
            .withMessage('Cada poder debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),
        
        body('aliados')
            .exists({ checkFalsy: true }).withMessage('El campo aliados es requerido')
            .isArray({ min: 1 }).withMessage('El campo aliados debe ser un arreglo con al menos un elemento')
            .custom(value => value.every(item => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60))
            .withMessage('Cada aliado debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),
        
        body('enemigos')
            .exists({ checkFalsy: true }).withMessage('El campo enemigos es requerido')
            .isArray({ min: 1 }).withMessage('El campo enemigos debe ser un arreglo con al menos un elemento')
            .custom(value => value.every(item => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60))
            .withMessage('Cada enemigo debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),
    
        body('habilidadEspecial')
            .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
            .isString()
            .notEmpty()
            .withMessage('La habilidad especial es obligatoria'),
        ];
    };

    export const preprocesarDatos = (req, res, next) => {
        if (req.body.poderes && typeof req.body.poderes === 'string') {
            // Transforma el string en un array, eliminando espacios adicionales
            req.body.poderes = req.body.poderes.split(',').map(poder => poder.trim());
        } else {
            // Si no existe el campo, lo inicializa como un array vacío
            req.body.poderes = [];
        }

        if (req.body.aliados && typeof req.body.aliados === 'string') {
            // Transforma el string en un array, eliminando espacios adicionales
            req.body.aliados = req.body.aliados.split(',').map(aliado => aliado.trim());
        } else {
            // Si no existe el campo, lo inicializa como un array vacío
            req.body.aliados = [];
        }

        if (req.body.enemigos && typeof req.body.enemigos === 'string') {
            // Transforma el string en un array, eliminando espacios adicionales
            req.body.enemigos = req.body.enemigos.split(',').map(enemigo => enemigo.trim());
        } else {
            // Si no existe el campo, lo inicializa como un array vacío
            req.body.enemigos = [];
        }
        next();
    };
    

