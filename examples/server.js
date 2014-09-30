var reQ = require('../lib');

reQ.query({
    type: 'iw4',
    host: '174.2.136.143:28961',
    timeout: 1500,
    parse: true
}).then(function(state) {
    reQ.query({
        type: 'iw4/players',
        host: '174.2.136.143:28961',
        parse: true
    }).then(function(players) {
        state.players = players;
        console.log(state);
    }, function(playersError) {
        console.log('PlayerError: ' + playersError);
    });
}, function(serverError) {
    console.log('ServerError: ' + serverError);
});
