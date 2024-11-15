import express from 'express';
import { obtenerSuperheroePorIdController,obtenerTodosLosSuperheroesController,buscarSuperheroePorAtributoController,obtenerSuperheroeMayoresDe30Controller, 
    insertarSuperheroesController, modificarSuperheroesController, eliminarSuperheroesIdController,eliminarSuperheroesNombreController } from '../controllers/superheroesControllers.mjs';

const router = express.Router();

router.get('/', obtenerTodosLosSuperheroesController);
router.get('/id/:id', obtenerSuperheroePorIdController);
router.get('/atributo/:atributo/:valor', buscarSuperheroePorAtributoController);
router.get('/edad/mayorA30', obtenerSuperheroeMayoresDe30Controller);

//crear un nuevo superheroe
router.post('/', insertarSuperheroesController);

//actualizar un superheroe por ID
router.put('/:id', modificarSuperheroesController);

//eliminar  un superheroe por ID
router.delete('/:id', eliminarSuperheroesIdController);

//eliminar  un superheroe por Nombre
router.delete('/nombre/:nombre', eliminarSuperheroesNombreController);


export default router;