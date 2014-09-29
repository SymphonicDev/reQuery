var dgram = require('dgram'),
    udpSocket = dgram.createSocket('udp4'),
    activeQueries = [],
    Q = require('q');

udpSocket.unref();
udpSocket.bind(1337);
udpSocket.on('message', function(buffer, rinfo) {
    for (var i = 0; i < activeQueries.length; i++) {
        var query = activeQueries[i];
        if (query.options.address != rinfo.address) {
            continue;
        }
        if (query.options.port != rinfo.port) {
            continue;
        }
        return query.udpResponse(buffer);
    }
});

module.exports = {
    query: function(options) {

        var type = (options.type || '').replace(/\W/g, '');
        var protocol = require('./protocols/' + type);

        var query = new protocol();
        query.udpSocket = udpSocket;
        query.type = type;
        query.deferred = Q.defer();

        for (var i in options) {
            query.options[i] = options[i];
        }

        activeQueries.push(query);

        query
            .start()
            .then(function(state) {
                var i = activeQueries.indexOf(query);
                if (i >= 0)
                    activeQueries.splice(i, 1);
            });

        return query.deferred.promise;
    }
};
