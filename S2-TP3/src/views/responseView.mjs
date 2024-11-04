//En estacapa de define la manera de devolver y presentar los datos recibidos por parametros
export function renderizarSuperheroe(superheroe){
    return{
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real":  superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos:superheroe.enemigos,
        Creador: superheroe.Creador 
    };
}

export function renderizarListaSuperheroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}