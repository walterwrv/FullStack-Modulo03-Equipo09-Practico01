//No se bien que rol cunmple esto??
export default class SuperheroesDataSource {
    //metodo abstracto para obtener todos los super heroes
    obtenerTodos(){
        throw new Error('Este metodo debe ser implementado por la subclase');
    }
}