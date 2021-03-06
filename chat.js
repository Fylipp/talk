'use strict'

const WebSocket = require('ws')

exports.init = (config, server) => {
    function generateName() {
        const random = array => array[Math.floor(Math.random() * array.length)]
        return `${random(config.nameGeneratorAdjectives)} ${random(config.nameGeneratorNouns)}`
    }

    const wss = new WebSocket.Server({ server: server })

    wss.on('listening', () => {
        console.log(`Websocket server is listening on ${wss._server.address().port}`)
    })

    wss.on('connection', ws => {
        if (wss.clients.size >= config.maxConnections) {
            ws.send(JSON.stringify({ author: 'Server (private)', message: 'This server is currently full.' }))
            ws.close()

            console.log(`Incoming websocket connection dismissed due to server being full (max = ${config.maxConnections})`)

            return
        }

        while (true) {
            const name = generateName()

            if ([...wss.clients].find(c => c.$clientName === name) === undefined) {
                ws.$clientName = name
                break
            }
        }

        ws.send(JSON.stringify({ assignedName: ws.$clientName }))

        ws.on('message', message => {
            try {
                var json = JSON.parse(message)

                if (json.message) {
                    try {
                        broadcast(ws.$clientName, json.message)
                    } catch (e) {
                        console.log('Error broadcasting message: ', e)
                    }
                }
            } catch (e) {
                console.log('Error processing message: ', e)
            }
        })
    })

    function broadcast(author, message) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ author: author, message: message }))
            }
        })
    }
}
