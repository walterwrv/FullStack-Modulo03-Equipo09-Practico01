import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import router from './routes/superHeroRoutes.mjs';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import session from 'express-session';
import methodOverride from 'method-override'; //para que interprte el metodo enviado desde ejs
import path from 'path';
import expressLayouts from 'express-ejs-layouts';


const app = express();

const PORT = 3005;


//conexion a MongoDB
connectDB();

// Middleware para parsear los datos de los formularios
app.use(express.urlencoded({ extended: true }));  // Para formularios con método POST
//Middleware para parsear JSON
app.use(express.json());
app.use(bodyParser.json());

// Configurar method-override para interpretar '_method'
app.use(methodOverride('_method'));

// app.set('views', './views/paginas'); // Define el directorio raíz de las vistas
app.set('views', path.resolve('./views'));//Define el directorio raíz de las vistas estatico
app.set('view engine', 'ejs'); // Usa EJS como motor de vistas

//configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); //archivo base de layout
app.use(express.static(path.resolve('./public')));//busca todo lo estatico en public, como los css



// Configuración de sesión
app.use(session({
    secret: 'aL0ngAndC0mpl3xStr1ng!@#$', // Cambia esto por un secreto real
    resave: false,
    saveUninitialized: true
}));

// Inicializa flash
app.use(flash());
// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Rutas
app.use('/superheroes', router);

//manejo de errores para rutas no encontradas
app.use((req, res)=>{
    res.status(404).send({mensaje: 'Ruta no encontrada'});
});

//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})