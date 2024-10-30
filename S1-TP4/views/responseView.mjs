//En estacapa de define la manera de devolver y presentar los datos recibidos por parametros
export function renderizarSuperheroe(superheroe){
    return JSON.stringify(superheroe, null, 2);
}

export function renderizarListaSuperheroes(superheroes){
    return JSON.stringify(superheroes, null, 2);
}