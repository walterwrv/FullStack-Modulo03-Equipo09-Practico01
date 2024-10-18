import fs from 'fs';

class Superherore {
    constructor(id, nombreSuperheroe,nombreReal,edad,planetaOrigen,debilidad,poder,
    habilidadEspecial,aliado,enemigo)
    {
        this.id = id;
        this.nombreSuperheroe = nombreSuperheroe;
        this.nombreReal = nombreReal;
        this.edad = edad;
        this.planetaOrigen = planetaOrigen;
        this.debilidad = debilidad;
        this.poder = poder;
        this.habilidadEspecial = habilidadEspecial;
        this.aliado = aliado;
        this.enemigo = enemigo;

    }
}    


export function leerSuperherores(ruta) {
    
    const datos = fs.readFileSync(ruta, 'utf8');
    const superheroesArray = JSON.parse(datos);
    
    //convertir a instancia de superherores
    const superheroes = superheroesArray.map(
        heroe => new Superherore(heroe.id, heroe.nombreSuperheroe, heroe.nombreReal, heroe.edad, heroe.planetaOrigen,
            heroe.debilidad, heroe.poder, heroe.habilidadEspecial, heroe.aliado, heroe.enemigo
        )
    )

    // ordenar por nombre de superheroe
    superheroes.sort((a,b) => a.nombreSuperheroe.localeCompare(b.nombreSuperheroe));
    return superheroes;
}

export function agregarSuperheroes(rutaOriginal, rutaNuevos) {
    
    const datosoriginales = fs.readFileSync(rutaOriginal, 'utf8');
    const datosNuevos = fs.readFileSync(rutaNuevos, 'utf8');

    const superheroesOriginales = JSON.parse(datosoriginales);
    const nuevosSuperheroes = JSON.parse(datosNuevos);

    const instanciasNuevos = nuevosSuperheroes.map(
        hero => new Superherore(hero.id, hero.nombreSuperheroe, hero.nombreReal, hero.edad, hero.planetaOrigen,
            hero.debilidad, hero.poder, hero.habilidadEspecial, hero.aliado, hero.enemigo
        )
    )

    //combinar listas
    const listaActualizada = [...superheroesOriginales, ...instanciasNuevos];

    //guardar lisa actualizada
    fs.writeFileSync(rutaOriginal, JSON.stringify(listaActualizada, null, 2), 'utf8');
    console.log('lista de superheropes actualizada con éxito.');
}
