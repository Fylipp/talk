'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')

exports.init = (config) => {
    function load(file) {
        return fs.readFileSync(path.join(__dirname, config.resourcesRoot, file))
    }

    let resourceMap = {}
    for (const file of Object.keys(config.resources)) {
        const info = config.resources[file]

        const entry = {
            file: file,
            mime: info.mime || 'text/plain'
        }

        if (config.cacheResources) {
            console.log(`Loading resource into cache: ${file}`)
            entry.cachedData = load(file)
        }

        resourceMap[info.url || `/${file}`] = entry
    }

    const requestHandler = (request, response) => {
        if (request.method !== 'GET') {
            response.writeHead(405, {
                'Content-Type': 'text/html'
            })

            response.end('Invalid method')
        }

        const resource = resourceMap[request.url]

        if (resource) {
            let data = resource.cachedData

            if (!data) {
                console.log(`Loading non-cached: ${resource.file}`)
                data = load(resource.file)
            }

            response.writeHead(200, {
                'Content-Type': resource.mime
            })

            response.end(data)
        } else {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            })

            response.end('Not found<br><a href="/">Go to start</a>')
        }
    }

    const server = exports.server = http.createServer(requestHandler)

    server.listen(process.env.PORT || config.port, err => {
        if (err) {
            return console.log('An error occurred: ', err)
        }

        console.log(`Web server is listening on port ${server.address().port}`)
    })

    return server
}