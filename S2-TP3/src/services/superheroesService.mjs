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

