//En esta capa se definen las clases y se obtienen los datos a ser utilizados por la capa de servicio
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SuperheroesDataSource from './superheroesDataSource.mjs';

//esto me trae la url del archivo actual en el que estás escribiendo el código
//Ejemplo C:\wamp64\www\modulo03-TP01\TP4\repository\superheroesRepository.mjs
const __filename = fileURLToPath(import.meta.url);

// Esto proporciona la carpeta principal de ese archivo actual
////Ejemplo C:\wamp64\www\modulo03-TP01\TP4\repository
const __dirname = path.dirname(__filename);

export default class SuperheroesFileRepository extends SuperheroesDataSource{
    constructor(){
        //Esto no se bien que hace
        super();
        //Esto agrega un atributo llamado filePath y le pone el valor de la ruta del archivo superheroes.txt
        this.filePath = path.join(__dirname, '../superheroes.txt');
    }
    
    //Declara la funcion abstracta que habia sido definida en superheroesDataSoource.mjs
    obtenerTodos(){
        //Lee el archivo superheroes.txt definido en el atributo filePath
        const data = fs.readFileSync(this.filePath, 'utf-8');
        //retorna en el contenido del archivo formateado en array de objetos JS
        return JSON.parse(data); // convierte el archivo JSON en un array de objetos JS
    }
}