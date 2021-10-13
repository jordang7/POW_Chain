const jayson = require('jayson');

const client = jayson.client.http({
    port:3000
})

module.exports = client;