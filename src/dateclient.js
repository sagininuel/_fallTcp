const net = require('node:net');

const client = new net.Socket()

client.connect({ port: 4000, host: process.argv[2] ?? "localhost" })

client.on("data", (data) => {
    console.log(data.toString())
})