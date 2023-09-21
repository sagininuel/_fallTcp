const net = require('node:net')

const server = net.createServer((socket) => {
    console.log("Connection from", socket.remoteAddress, "port", socket.remotePort)

    socket.on("data", (buffer) => {
        console.log("Request from", socket.remoteAddress, "port", socket.remotePort)
        socket.write(`${buffer.toString("utf-8").toUpperCase()}\n`)
    })
    socket.on("end", () => {
        console.log("Closed", socket.remoteAddress, "port", socket.remotePort)
    })
})

server.maxConnections = 20000
console.log("Server Listening!")
server.listen(4000)