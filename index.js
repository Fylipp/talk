'use strict'

const web = require('./web.js')
const server = web.init(process.env.PORT || 80);

const chat = require('./chat.js')
chat.init(server)
