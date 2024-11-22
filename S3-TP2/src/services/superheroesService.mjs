//En esta capa se defininen todas las funciones a utilizar por los controladores

import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';


export async function obtenerSuperheroePorId(id){
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes(){
    
    return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor){

    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30(){
    
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export async function insertarSuperheroes(nombreSuperHeroe, nombreReal, edad, planetaOrigen,debilidad,poderes,aliados,enemigos){
    
    return await SuperHeroRepository.insertarSuperheroe(nombreSuperHeroe, nombreReal, edad, planetaOrigen,debilidad,poderes,aliados,enemigos);
}

export async function modificarSuperheroes(id, nombreSuperHeroe,nombreReal, edad, planetaOrigen){
    
    return await SuperHeroRepository.modificarSuperheroe(id, nombreSuperHeroe,nombreReal, edad, planetaOrigen);
}

export async function eliminarSuperheroesId(id){
    
    return await SuperHeroRepository.eliminarSuperheroeId(id);
}

export async function eliminarSuperheroesNombre(nombre){
    
    return await SuperHeroRepository.eliminarSuperheroeNombre(nombre);
}



