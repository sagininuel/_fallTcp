//import net from "net"
const net = require('node:net');

let i = 1
const server = net.createServer((socket) => {
    socket.end(`${new Date()}\n`)
    console.log("Data sent", i++)

})

console.log("Server listening!")
server.listen(4000)