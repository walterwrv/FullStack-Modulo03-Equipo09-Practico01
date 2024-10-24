//Este es el archivo principal desde donde se llama los controladores, se definen las url y se ejecuta el ervidor
import express from 'express';
import {obtenerSuperheroePorIdController, buscarSuperheroePorAtributoController, obtenerSuperheroeMayoresDe30Controller} 
from './controllers/superheroesControllers.mjs';

const app = express();

const PORT = 3005;

//Rutas

app.get('/superheroes/id/:id', obtenerSuperheroePorIdController);

app.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroePorAtributoController);

app.get('/superheroes/edad/mayorA30', obtenerSuperheroeMayoresDe30Controller);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})