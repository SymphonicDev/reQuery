var reQ = require('./lib');

//how I'd essentially like it to look
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