const { on } = require('events');
const express = require('express');
const {Server: HttpServer} = require('http'); //http tiene un modulo que se llama server pero socket tambien tiene un modulo que se llama server, la destructuración entre llaves avisa que solo voy a usar esa funcionalidad, este es un renombre que le asignamos a la variable
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// middleware para archivos estáticos:
app.use(express.static('./public'))

const PORT = 8080

const messages = [
    {author: 'Blixa', text: 'This is the weeping song'},
    {author: 'Nick', text: 'Oh father'},
    {author: 'Ian', text: 'This is the one'}
]

// implementacion/configuracion del socket
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    // vamos a enviar el historial del chat cuando un nuevo cliente se conecte
    socket.emit('message', messages) // no me andaba porque había puesto 'messages' en lugar de 'message'

    // para recibir el mensaje escuchamos al cliente:
    socket.on('new-message', data => {
        messages.push(data)

        // reenviamos por medio de broadcast los mensajes a todos los clientes que estén conectados en ese momento
        io.sockets.emit('message', messages) // envío el array previo push, o sea que está el último mensaje que se agregó
    })

})


// no va app.listen sino httpServer porque cuando usamos socket necesitamos levantar el servidor principal con http

httpServer.listen(PORT, () => {
    console.log(`server run on PORT: ${PORT}`);
})