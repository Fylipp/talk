'use strict'

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const maxConnections = 12

wss.on('listening', () => {
    console.log(`Websocket server is listening on ${wss._server.address().port}`)
})

wss.on('connection', ws => {    
    if (wss.clients.size >= maxConnections) {
        ws.send(JSON.stringify({ author: 'Server (private)', message: 'This server is currently full.' }))
        ws.close()

        console.log(`Incoming websocket connection dismissed due to server being full (max = ${maxConnections})`)

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
            broadcast(ws.$clientName, message)
        } catch (e) {
            console.log('Error broadcasting message: ', e)
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

function generateName() {
    const adjs = ['Curious', 'Red', 'Tall', 'Shallow', 'Redundant', 'Wild', 'Old', 'Fresh', 'Friendly', 'Wet', 'Crazy', 'Delicious', 'Hairy', 'Fast']
    const nouns = ['Kitten', 'House', 'Dog', 'Puppy', 'Snow', 'Smith', 'Lion', 'Fridge', 'Tornado', 'Giant', 'Snowman', 'Toad', 'Eagle', 'Hedgehog']

    const random = array => array[Math.floor(Math.random() * array.length)]

    return `${random(adjs)} ${random(nouns)}`
}
