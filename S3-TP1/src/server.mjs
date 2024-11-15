import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import router from './routes/superHeroRoutes.mjs';
// import bodyParser from 'body-parser';

const app = express();

const PORT = 3005;

//conexion a MongoDB
connectDB();

//Middleware para parsear JSON
app.use(express.json());
// app.use(bodyParser.json());

//Rutas
app.use('/superheroes', router);

//manejo de errores para rutas no encontradas
app.use((req, res)=>{
    res.status(404), send({mensaje: "Ruta no encontrada"});
});

//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})