const socket = io()

let username

const chatbox = document.querySelector("#chatbox")
const messageLogs = document.querySelector("#messagelogs")
Swal.fire({
    title: "Ingrese un nombre de usuario",
    input: "text",
    text: "Debes identificarte primero",
    inputValidator: (value) => {
        return !value && 'Debes escribir un nombre de usuario valido'
    },
    allowOutsideClick: false
}).then((result) => {
    username = result.value
    socket.emit("newUser", username)
})

chatbox.addEventListener("keyup", (evt) => {
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length != 0){
            socket.emit("message", {user: username, message: chatbox.value})
            chatbox.value = ""
        }
    }
})

socket.on("newUser", (user) => {
    console.log(user)
    Swal.fire({
        text: `${user} se ha conectado`,
        toast: true,
        position: "top-right"
    })
})

socket.on("firstConnection", (messages) => {
    console.log("Hola")
    console.log(messages)
    for(let messageIndex in messages){
        let { user, message } = messages[messageIndex]
        messageLogs.innerHTML += `${user}: ${message} </br>`
    }
})

socket.on("message", (info) => {
    console.log("Se recibio la señal")
    let { user, message } = info
    messageLogs.innerHTML += `${user}: ${message} </br>`
})