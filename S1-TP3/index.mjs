import {leerSuperherores, agregarSuperheroes} from './utils.mjs';

const archivoOriginal = './superheroes.txt';
const archivoNuevo = './agregarSuperheroes.txt';

//agregar superheores
agregarSuperheroes(archivoOriginal, archivoNuevo);

const superheroes = leerSuperherores(archivoOriginal);
console.log('Superheroes ordenados:');
console.log(superheroes);