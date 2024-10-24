//En esta capa se defininen todas las funciones a utilizar por los controladores

import SuperheroesRepository from '../repository/superheroesRepository.mjs';

//genera una instancia de la clase SuperheroesRepository
const repository = new SuperheroesRepository();

export function obtenerSuperheroePorId(id){
    //puedo usar el metodo de la clase llamado obtenerTodos(), para obtener el contendio del archivo .txt en fomrato de array de objetos JS
    const superheroes = repository.obtenerTodos();
    //retorno solo los que coninciden que el atributo id sea igual al id pasado por parametro por medio de la funcion find
    return superheroes.find(hero=> hero.id === id);
}

export function buscarSuperheroePorAtributo(atributo, valor){
    const superheroes = repository.obtenerTodos();

    //hago un filtrado y devuelvo solo los incluidos en donde el valor del atributo sean los pasados por los parametros
    return superheroes.filter(hero => 
        String(hero[atributo]).toLowerCase().includes(valor.toLowerCase())
    );
}

export function obtenerSuperheroeMayoresDe30(){
    
    const superheroes = repository.obtenerTodos();

    //Hago filtrado por edad y planeta origen y cantidad de poder >= 2
    return superheroes.filter(
        hero => hero.edad > 30 && hero.planetaOrigen === 'Tierra' && hero.poder.length >= 2
    );
}