/*Es esta capa se definen los controladores, que determinan como se obtienen parametros 
de las url y llama a la funciones que los van a utiliar. Tambien invoca la renderizacion de la capa View*/

import {obtenerSuperheroePorId, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, 
    obtenerTodosLosSuperheroes, insertarSuperheroes, modificarSuperheroes, eliminarSuperheroesId, eliminarSuperheroesNombre} 
from "../services/superheroesService.mjs";

import {renderizarSuperheroe, renderizarListaSuperheroes} from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res){
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: 'Super heroe no encontrado'});
    }
}

export async function obtenerTodosLosSuperheroesController(req, res){
    
    const superheroes = await obtenerTodosLosSuperheroes();

    res.send(renderizarListaSuperheroes(superheroes));
    
}

export async function buscarSuperheroePorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes));
    }else{
        res.status(404).send({mensaje: 'No se encontraron superheroes con ese atributo'});
    }
}


export  async function obtenerSuperheroeMayoresDe30Controller(req, res){
    const superheroes =  await obtenerSuperheroesMayoresDe30();

    res.send(renderizarListaSuperheroes(superheroes));
    
   
}

export  async function insertarSuperheroesController(req, res){

    const {nombreSuperHeroe,nombreReal,edad,planetaOrigen,debilidad,poderes,aliados,enemigos} = req.body;
    
    const superheroe =  await insertarSuperheroes(nombreSuperHeroe, nombreReal, edad, planetaOrigen,debilidad,poderes,aliados,enemigos);

    res.send(renderizarSuperheroe(superheroe));
    
   
}

export  async function modificarSuperheroesController(req, res){

    const {id} = req.params;
    const {nombreSuperHeroe, nombreReal, edad, planetaOrigen} = req.body;
   
    const superheroe =  await modificarSuperheroes(id, nombreSuperHeroe, nombreReal, edad, planetaOrigen);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: 'No se encontró superheroe con ese ID'});
    }
}

export  async function eliminarSuperheroesIdController(req, res){

    const {id} = req.params;
    
    const superheroe =  await eliminarSuperheroesId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: 'No se encontró superheroe con ese ID'});
    }
}

export  async function eliminarSuperheroesNombreController(req, res){

    const {nombre} = req.params;
    console.log('Nombre a borrar ',nombre)
    const superheroe =  await eliminarSuperheroesNombre(nombre);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: 'No se encontró superheroe con ese Nombre'});
    }
}
