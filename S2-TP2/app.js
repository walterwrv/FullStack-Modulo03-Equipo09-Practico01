const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Grupo-09:grupo09@cursadanodejs.ls9ii.mongodb.net/Node-js',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

  const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required: true},
    nombreReal: {type: String, required: true},
    edad: {type: Number, min: 0},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    cratedAt: {type: Date, default: Date.now},
    Creador: {type: String, default: 'Walter Vergara'}
  }, { collection: 'Grupo-09' });
  
  const SuperHero = mongoose.model('SuperHero', superheroSchema);

// INSERTAR UN ELEMENTO
  async function insertSuperHero(){
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spidermancito',
        nombreReal: 'Peter Parker',
        edad: 36,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trpar paredes', 'Sentido aracnido'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde']
    });

    await hero.save();
    console.log('Superheroe insertado: ', hero);
  }

  insertSuperHero();

//MODIFICAR UN ELEMENTO
  async function updateSuperHero(nombre){
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe: nombre},
        {$set: {edad:36}}
    );
    console.log('resultado a la actualización ',result);
  }

  // updateSuperHero('Spidermancito');

// ELIMINAR UN ELEMENTO
async function deleteSuperHero(nombre){
  const result = await SuperHero.deleteOne(
      {nombreSuperHeroe: nombre}
  );
  console.log('Super Heroe eliminado ',result);
}

// deleteSuperHero('Spidermancito');

// BUSCAR UN ELEMENTO
async function findSuperHeroes(){
  const heroes = await SuperHero.find(
      {planetaOrigen: 'Tierra'}
  );
  console.log('Super heroes encontrados ',heroes);
}
// findSuperHeroes();