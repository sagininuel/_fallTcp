const net = require('node:net')

let usernames = new Set()
let clients = new Set()

function broadcastMessage(socket, message) {
    for (const client of clients) {
        if (client !== socket) {
            client.write(`${message}\n`)
        }
    }
}

function tryAcceptName(socket, name) {
    if (usernames.has(name)) {
        socket.write("Username already taken. Please try again:\n")
        return null
    }
    usernames.add(name)
    clients.add(socket)
    broadcastMessage(socket, `${name} has joined the chat!`)
    return name
}

function handleClientLeaving(socket, name) {
    console.log(`${name} disconnected`)
    usernames.delete(name)
    clients.delete(socket)
    broadcastMessage(socket, `${name} left the chat!`)
}

net
    .createServer((socket) => {
        let name = null
        console.log(`Connection from ${socket.remoteAddress} port ${socket.remotePort}`)
        socket.write("Welcome to the chat! Please enter your name:\n")
        socket.on("data", (buffer) => {
            const message = buffer.toString("utf-8").trim()
            if (!name) {
                name = tryAcceptName(socket, message)
            } else {
                broadcastMessage(socket, `${name}: ${message}`)
            }
        })
        socket.on("end", () => handleClientLeaving(socket, name))
    })
    .listen(4000, () => {
        console.log("Chat server is running")
    })