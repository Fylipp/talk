'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')

const resFolder = 'public'

console.log('Loading resources...')

function load(file) {
    return fs.readFileSync(path.join(__dirname, resFolder, file), 'UTF-8')
}

function loadRaw(file) {
    return fs.readFileSync(path.join(__dirname, resFolder, file))    
}

const res = {
    '/': {
        content: load('index.html'),
        mime: 'text/html'
    },
    '/favicon.ico': {
        content: loadRaw('favicon.ico'),
        mime: 'image/x-icon'
    },
    '/style.css': {
        content: load('style.css'),
        mime: 'text/css'
    },
    '/client.js': {
        content: load('client.js'),
        mime: 'application/javascript'
    }
}

const requestHandler = (request, response) => {
    if (request.method !== 'GET') {
        response.statusCode = 405
        response.end('Invalid method')
    }

    const page = res[request.url]

    if (page === undefined) {
        response.statusCode = 404
        response.end('Not found<br><a href="/">Go to start</a>')
    } else {
        response.writeHead(200, {"Content-Type": page.mime})   
        response.end(page.content)
    }
}

const server = http.createServer(requestHandler)

server.listen(80, err => {
    if (err) {
        return console.log('An error occurred: ', err)
    }

    console.log(`Web server is listening on port ${server.address().port}`)
})

