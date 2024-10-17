import fs from 'fs';

//leer archivo de manera asincrona
fs.readFile('./data/nuevofile.txt', 'utf8', (err, data)=>{

    if(err) throw err;
    console.log('Contenido del archivo ', data);
});

//escribir archivo de manera asincron
fs.writeFile('./data/nuevofile.txt', 'Nuevo conetnido', (err)=>{
    if(err) throw err;
    console.log('Archivo creado y escrito');
});

fs.rename('./data/nuevofile.txt', './data/renamefile.txt', (err)=>{
    if(err) throw err;
    console.log('Archivo renombrado');
});





