import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3005;

//Middleware para parsear JSON
app.use(express.json);

//conexion a MongoDB
connectDB();

//Configuración de rutas
app.use('./api', superHeroRoutes);

//manejo de errores para rutas no encontradas
app.use((req, res)=>{
    res.status(404), send({mensaje: "Ruta no encontrada"});
});

//Iniciar el servidor
app.listen(PORT,  ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});