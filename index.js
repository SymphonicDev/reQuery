var reQ = require('./lib');

reQ.query({
    type: 'iw4master',
    host: '176.57.141.201',
    port: 20810,
    timeout: 1500,
    parse: true
}).then(function(state) {
    console.log(state);
}, function(error) {
    console.log(error);
});