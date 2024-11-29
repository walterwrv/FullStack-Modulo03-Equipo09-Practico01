import express from 'express';
import { obtenerSuperheroePorIdController,obtenerTodosLosSuperheroesController,buscarSuperheroePorAtributoController,obtenerSuperheroeMayoresDe30Controller, 
    insertarSuperheroesController, modificarSuperheroesController, eliminarSuperheroesIdController,eliminarSuperheroesNombreController,
    editHeroeId, editarGuardar, eliminarSuperheroesIdDashboardController, insertarSuperheroesDashboardController } from '../controllers/superheroesControllers.mjs';

// Importa las validaciones desde el middleware
import { 
    insertarSuperheroeValidationRules, 
    actualizarSuperheroeValidationRules,
    preprocesarDatos
  } from '../validations/validationRules.mjs';  // Asegúrate de que la ruta sea correcta

 import { handleValidationErrors, handleValidationErrorsEditar } from '../validations/errorMiddleware.mjs';// Importa el middleware de validación de errores

const router = express.Router();

router.get('/', obtenerTodosLosSuperheroesController);
router.get('/id/:id', obtenerSuperheroePorIdController);
router.get('/atributo/:atributo/:valor', buscarSuperheroePorAtributoController);
router.get('/edad/mayorA30', obtenerSuperheroeMayoresDe30Controller);

//crear un nuevo superheroe
router.post('/', 
    insertarSuperheroeValidationRules(),  // Valida los campos antes de procesar
    handleValidationErrors,  // Middleware que maneja los errores de validación
    insertarSuperheroesController
);

//actualizar un superheroe por ID
router.put('/:id', modificarSuperheroesController);

//eliminar  un superheroe por ID
router.delete('/:id', eliminarSuperheroesIdController);

//eliminar  un superheroe por Nombre
router.delete('/nombre/:nombre', eliminarSuperheroesNombreController);


//rutas ejs
router.get('/agregar', (req,res) => {
    const datosHeroe = req.body;
    console.log('datos ', datosHeroe);
    res.render('addSuperhero', {errors: [], datosHeroe})

    });

router.post('/guardar', 
    preprocesarDatos,
    insertarSuperheroeValidationRules(),  // Valida los campos antes de procesar
    handleValidationErrors,  // Middleware que maneja los errores de validación
    insertarSuperheroesDashboardController
);

router.get('/editar/:id',editHeroeId)
router.put('/editarHeroe/:id',
    preprocesarDatos,
    actualizarSuperheroeValidationRules(),  // Valida los campos antes de procesar
    handleValidationErrorsEditar,  // Middleware que maneja los errores de validación
    editarGuardar
);

router.delete('/eliminar/:id', eliminarSuperheroesIdDashboardController);


export default router;