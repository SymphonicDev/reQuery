# reQ gameserver query

## Instructions
Require the library and create a new query using the following

        var reQ = require('./refactor/lib');

        var query = reQ.query({
            type: 'iw4master',
            host: '176.57.141.201',
            port: 20810,
            timeout: 1500,
            parse: true
        }); //returns a promise

        query.then(function(state) {
            console.log(state);
        }, function(error) {
            console.log(error);
        });