const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000)

//  static file
app.use(express.static(path.join(__dirname, 'public')))


const SocketIO = require('socket.io')

const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})

const io = SocketIO(server)

io.on('connection', (socket) => {
    console.log('new connection', socket.id)

    socket.on('chat:message', (data) => {
        // console.log(data)
        io.sockets.emit('chat:message', data) //para todos
    })

    socket.on('chat:typing', (data) => {
        console.log(data)
        socket.broadcast.emit('chat:typing', data)
    })
})