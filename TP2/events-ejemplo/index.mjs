import {EventEmitter} from 'events';
//creo una instancia de eEentemitter

const emisor =new EventEmitter();

//definir evento personalizados

emisor.on('saludo', (nombre)=>{

    console.log(`Hola, ${nombre}!`);
})

//Emitir el evento
emisor.emit('saludo', 'Walter');