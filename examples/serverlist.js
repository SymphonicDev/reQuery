var reQ = require('../lib'),
    http = require('http'),
    serverCache = [],
    server = http.createServer(function(request, response) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(serverCache, null, '\t'));
        response.end();
    });

server.listen(12345);
update();
setInterval(update, 60000); //Update the list every 60 seconds

function update() {
    reQ.query({
        type: 'iw4master',
        host: '176.57.141.201',
        port: 20810,
        timeout: 1500,
        parse: true
    }).then(function(servers) {
        serverCache = [];
        servers.forEach(function(server) {
            reQ.query({
                type: 'iw4',
                host: server.ip,
                port: server.port,
                timeout: 1500,
                parse: true
            }).then(function(result) {
                serverCache.push(result);
            });
        });
    }, function(error) {
        console.log(error);
    });
}