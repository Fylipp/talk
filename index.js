'use strict'

const config = require('./config.js')

const web = require('./web.js')
const server = web.init(config);

const chat = require('./chat.js')
chat.init(config, server)
