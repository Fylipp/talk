// This file allows for painless adjustments to some settings

module.exports = {
    // The maximum amount of simultaneous users
    maxConnections: 12,

    // The port to use if <process.env.PORT> is not set
    port: 80,

    // The folder containing the client-side resources
    resourcesRoot: 'public',

    // Whether resources should be loaded only at startup
    cacheResources: true,

    // Defines the client-side resources
    resources: {
        'index.html': {
            url: '/',
            mime: 'text/html'
        },

        'favicon.ico': {
            mime: 'image/x-icon'
        },

        'style.css': {
            mime: 'text/css'
        },

        'client.js': {
            mime: 'application/javascript'
        }
    }
}
