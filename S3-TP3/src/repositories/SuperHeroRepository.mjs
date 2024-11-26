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
                poderes: { $exists: true, $type: 'array' }, // Aseguramos que "poderes" existe y es un array
                $expr: { $gte: [{ $size: "$poderes" }, 2] } // Aseguramos que el tamaño del array sea al menos 2
            });
        } catch (error) {
            console.error('Error al obtener los héroes:', error);
            throw error; // Re-lanzamos el error para que pueda ser manejado fuera si es necesario
        }
    }

    async  insertarSuperheroe(nombreSuperHeroe, nombreReal, edad, planetaOrigen,debilidad,poderes,aliados,enemigos,creador) {
        try {
            // Crear un nuevo superhéroe con los datos del body
            const nuevoSuperheroe = new SuperHero({
                
                nombreSuperHeroe: nombreSuperHeroe,
                nombreReal: nombreReal,
                edad: edad,
                planetaOrigen: planetaOrigen,
                debilidad: debilidad,
                poderes: poderes,
                aliados: aliados,
                enemigos: enemigos,
                creador: creador,
    
            });
    
            // Guardar el superhéroe en la base de datos
            const superheroeGuardado = await nuevoSuperheroe.save();
            // Devolver el superhéroe creado
            return superheroeGuardado;
            
            
        } catch (error) {
            // Manejar errores y devolver un mensaje apropiado
            console.error('Error al crear superhéroe:', error);
            res.status(500).json({ mensaje: 'Error al crear el superhéroe', error });
        }
    }


    async  modificarSuperheroe(id, nombreSuperHeroe,nombreReal, edad, planetaOrigen) {
        
        // Encontrar y actualizar el superhéroe
        const superheroeActualizado = await SuperHero.findByIdAndUpdate(
            id,  // ID del superhéroe a actualizar
            {    // Campos a actualizar (tomados del cuerpo de la petición)
                nombreSuperHeroe: nombreSuperHeroe,
                nombreReal: nombreReal,
                edad: edad,
                planetaOrigen: planetaOrigen
            },
            { new: true }  // Devolver el documento actualizado
        );

       // Devolver el superhéroe actualizado
        return superheroeActualizado;
    }

    async modificarSuperheroe(id, datosActualizados) {
        return await SuperHero.findOneAndUpdate(
            { _id: id }, // Criterio de búsqueda por id.
            datosActualizados, // Datos a actualizar.
            { new: true } // Retorna el documento actualizado.
        );
    }

    async  eliminarSuperheroeId(id) {
        
        // Encontrar y eliminar el superhéroe
        const superheroeBorrado = await SuperHero.findByIdAndDelete(id);

       // Devolver el superhéroe borrado
        return superheroeBorrado;
    }

    async  eliminarSuperheroeNombre(nombre) {
        
        // Encontrar y eliminar el superhéroe
        const superheroeBorrado = await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });


       // Devolver el superhéroe borrado
        return superheroeBorrado;
    }
}

//retorna una instancia de la clase SuperHeroRepository
export default new SuperHeroRepository();