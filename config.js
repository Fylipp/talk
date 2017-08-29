// This file allows for painless adjustments to some settings

module.exports = {
    // The maximum amount of simultaneous users
    maxConnections: 64,

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
    },

    // The adjectives availible to the name generator
    nameGeneratorAdjectives: [
        // Colors
        'Black', 'White', 'Red', 'Yellow', 'Lime', 'Blue', 'Orange', 'Gray', 'Silver', 'Olive', 'Green', 'Purple',

        // Textures
        'Smooth, Hairy', 'Bald', 'Sticky',

        // Traits
        'Ambitious', 'Bold', 'Brave', 'Calm', 'Clever', 'Curious', 'Decisive', 'Energetic', 'Generous', 'Kind', 'Smart',

        // Size
        'Tall', 'Short', 'Long',
    ],

    // The nouns availible to the name generator
    nameGeneratorNouns: [
        // Animals
        'Dog', 'Puppy', 'Cat', 'Kitten', 'Lion', 'Eagle', 'Hedgehog', 'Toad', 'Rabbit', 'Horse', 'Lizard', 'Giant', 'Dragon', 'Dwarf',

        // Jobs
        'Smith', 'Wizard', 'Carpenter', 'Firefighter', 'Mage', 'Race Driver', 'Farmer', 'Engineer', 'Tutor',

        // Misc.
        'Fridge', 'Tornado', 'Snowman'
    ]
}
