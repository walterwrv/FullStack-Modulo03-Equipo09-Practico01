//En esta capa se definen las clases y se obtienen los datos a ser utilizados por la capa de servicio

import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';


class SuperHeroRepository extends IRepository{
    
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }
    
    async obtenerTodos(){
        return await SuperHero.find();
    }

    async buscarPorAtributo(atributo, valor){
        const query = {[atributo]: new RegExp(valor,'i')};
        return await SuperHero.find(query);
    }

    async obtenerMayoresDe30(){
        // return await SuperHero.find({edad: {$gt:30}, planetaOrigen: 'Tierra', poderes: {$size: {$gte:2}}});
        return await SuperHero.find({edad: {$gt:30}, planetaOrigen: 'Tierra'});
    }
}

//retorna una instancia de la clase SuperHeroRepository
export default new SuperHeroRepository();