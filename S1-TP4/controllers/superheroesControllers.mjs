/*Es esta capa se definen los controladores, que determinan como se obtienen parametros 
de las url y llama a la funciones que los van a utiliar. Tambien invoca la renderizacion de la capa View*/

import {obtenerSuperheroePorId, buscarSuperheroePorAtributo, obtenerSuperheroeMayoresDe30, obtenerSuperheroes} 
from "../services/superheroesService.mjs";

import {renderizarSuperheroe, renderizarListaSuperheroes} from '../views/responseView.mjs';

export function obtenerSuperheroePorIdController(req, res){
    const {id} = req.params;
    const superheroe = obtenerSuperheroePorId(parseInt(id));

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: 'Super heroe no encontrado'});
    }
}

export function buscarSuperheroePorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroes = buscarSuperheroePorAtributo(atributo, valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes));
    }else{
        res.status(404).send({mensaje: 'No se encontraron superheroes con ese atributo'});
    }
}

export function obtenerSuperheroeMayoresDe30Controller(req, res){
    const superheroes = obtenerSuperheroeMayoresDe30();

    res.send(renderizarListaSuperheroes(superheroes));
}

export function obtenerSuperheroesController(req, res){
    
    const superheroes = obtenerSuperheroes();

    if(superheroes){
        res.send(renderizarListaSuperheroes(superheroes));
    }else{
        res.status(404).send({mensaje: 'Super heroe no encontrado'});
    }
}