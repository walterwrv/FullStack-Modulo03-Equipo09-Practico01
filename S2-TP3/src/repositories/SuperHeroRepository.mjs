//En esta capa se definen las clases y se obtienen los datos a ser utilizados por la capa de servicio

import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';


class SuperHeroRepository extends IRepository{
    
    async obtenerPorId(id){
        try {
            return await SuperHero.findById(id);
        } catch (error) {
            console.error('Error al obtener los héroes:', error);
            throw error; 
        }
    }
    
    async obtenerTodos(){
        try {
            return await SuperHero.find(); 
        } catch (error) {
            console.error('Error al obtener los héroes:', error);
            throw error; 
        }
    }

    async buscarPorAtributo(atributo, valor){
        try {
            if(atributo != 'edad'){
                const query = {[atributo]: new RegExp(valor,'i')};
                return await SuperHero.find(query);
            }else{
                const query = {[atributo]: valor};
                return await SuperHero.find(query);
            } 
        } catch (error) {
            console.error('Error al obtener los héroes:', error);
            throw error; 
        }
    }

    async  obtenerMayoresDe30() {
        try {
            return await SuperHero.find({
                edad: { $gt: 30 },
                planetaOrigen: 'Tierra',
                $expr: { $gte: [{ $size: "$poderes" }, 2] }
            });
        } catch (error) {
            console.error('Error al obtener los héroes:', error);
            throw error; // Re-lanzamos el error para que pueda ser manejado fuera si es necesario
        }
    }
}

//retorna una instancia de la clase SuperHeroRepository
export default new SuperHeroRepository();