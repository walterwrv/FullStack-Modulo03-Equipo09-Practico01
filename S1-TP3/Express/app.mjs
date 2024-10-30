import express from 'express';

//instancia de express
const app = express();

//confuguro el puertodonde el servidor escuchara
const port =3000;

//Ruta basica
app.get('/', (req,res)=>{
    res.send('Hola mundo!');
});

//Actividad 1 - Manejo de rutas con parametros
app.get('/user/:id', (req, res)=>{
    const userId = req.params.id;
    console.log(`Id del usuario recibido: ${userId}`);
    res.send(`Perfil del usuario con Id:  ${userId}`);
});

//Actividad 2 - Manejo de parametros de consulta
app.get('/profile', (req, res)=>{
    // Solicitud: http://localhost:3000/profile?edad=30
    const edad = req.query.edad;
    console.log(`Edad recibida: ${edad}`);
    res.send(`Edad del perfil: ${edad}`);
    
})

//iniciar el servidor
app.listen(port, ()=>{
    console.log('Servidor corriendo en http://localhost:',port);
})

