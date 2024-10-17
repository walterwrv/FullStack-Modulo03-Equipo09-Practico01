import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola mundooo!');

});

server.listen(port, hostname, ()=>{
    console.log('el servidor e esta ejecutando en '+hostname);
})


