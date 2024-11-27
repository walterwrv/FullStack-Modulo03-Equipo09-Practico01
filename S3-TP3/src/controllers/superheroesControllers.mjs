/*Es esta capa se definen los controladores, que determinan como se obtienen parametros 
de las url y llama a la funciones que los van a utiliar. Tambien invoca la renderizacion de la capa View*/

import {obtenerSuperheroePorId, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, 
    obtenerTodosLosSuperheroes, insertarSuperheroes, modificarSuperheroes, eliminarSuperheroesId, 
    eliminarSuperheroesNombre, modificarSuperheroeService, insertarSuperheroesDashboard} 
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
    res.render('dashboard', {superheroes})
    
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

    const {nombreSuperHeroe,nombreReal,edad,planetaOrigen,debilidad,poderes,aliados,enemigos,creador} = req.body;
    
    // Verificar que los campos requeridos estén presentes (aunque ya los valida con el middleware)
    if (!nombreSuperHeroe || !nombreReal || !edad || !poderes ) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
  
    // Validar que poder sea un arreglo (ya esta en el middleware, pero se hace aquí por seguridad)
    if (!Array.isArray(poderes)) {
        return res.status(400).json({ error: 'El campo poderes debe ser un arreglo' });
    }
    
    const superheroe =  await insertarSuperheroes(nombreSuperHeroe, nombreReal, edad, planetaOrigen,debilidad,poderes,aliados,enemigos,creador);

    // res.send(renderizarSuperheroe(superheroe));
    // Si se guardó correctamente, rederigimos a la vista dashboard
    req.flash('success_msg', 'Superhéroe insertado exitosamente');
    return res.redirect('/superheroes');
    
   
}

export  async function insertarSuperheroesDashboardController(req, res){
    
    
    const datosActualizados = {
        ...req.body,
        poderes: req.body.poderes.split(',').map(poder => poder.trim()),
        aliados: req.body.aliados.split(',').map(aliado => aliado.trim()),
        enemigos: req.body.enemigos.split(',').map(enemigo => enemigo.trim())
      };
    
    
    const superheroe =  await insertarSuperheroesDashboard(datosActualizados);

    // res.send(renderizarSuperheroe(superheroe));
    // Si se guardó correctamente, rederigimos a la vista dashboard
    req.flash('success_msg', 'Superhéroe insertado exitosamente');
    return res.redirect('/superheroes');
    
   
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

export  async function eliminarSuperheroesIdDashboardController(req, res){

    const {id} = req.params;
    const superheroe =  await eliminarSuperheroesId(id);

    if(superheroe){
        req.flash('success_msg', 'Superhéroe eliminado exitosamente');
        res.redirect('/superheroes');
        // return res.status(200).send({ mensaje: 'Superhéroe eliminado correctamente' });
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


export async function editHeroeId(req, res) {
    try{
        const {id}= req.params;
        const datosHeroe = await obtenerSuperheroePorId(id);
        //console.log(datosHeroes);
        if(!datosHeroe){
           return res.status(404).send("error al encontrarlo");
        }res.render('editSuperhero', {datosHeroe});
    }catch(error){
       return res.status(500).send("ocurrio un error", error);
    }
}


export async function editarGuardar(req, res) {
    try {
        const { id } = req.params;
        // const datosActualizados = req.body;

        
        const datosActualizados = {
            ...req.body,
            poderes: req.body.poderes.split(',').map(poder => poder.trim()),
            aliados: req.body.aliados.split(',').map(aliado => aliado.trim()),
            enemigos: req.body.enemigos.split(',').map(enemigo => enemigo.trim())
          };
        
        const actualizado = await modificarSuperheroeService(id, datosActualizados);
        
        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado o no se pudo actualizar' });
        }
        req.flash('success_msg', 'Superhéroe actualizado exitosamente');
        // res.redirect('/superheroes');
        return res.status(200).send({ mensaje: 'Superhéroe actualizado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}
