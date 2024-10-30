import express from 'express';
import { obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroePorAtributoController,
    obtenerSuperheroeMayoresDe30Controller }
from '../controllers/superheroesControllers.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('heroes/buscar/:atributo/:valor', buscarSuperheroePorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroeMayoresDe30Controller);

export default router;