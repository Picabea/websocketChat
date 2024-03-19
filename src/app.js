const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const viewsRouter = require('./routes/views.router')

const app = express()

const messages = []

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.static(`${__dirname}/../public`))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Server listo')
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log("Nuevo cliente conectado")

    socket.emit("firstConnection", messages)

    socket.on("message", (info) => {
        messages.push(info)
        io.emit("message", info)
        console.log("Mensaje recibido")
        console.log(info)
    })

    socket.on("newUser", (user) => {
        console.log(user)
        socket.broadcast.emit("newUser", user)
    })
})