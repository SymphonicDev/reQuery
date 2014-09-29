var Q = require('q'),
    Class = require('extend.class'),
    lookup = Q.denodeify(require('dns').lookup);

module.exports = Class.extend({
    init: function() {
        this._super();
        this.options = {};
        this.maxAttempts = 1;
        this.attempt = 1;
        this.finished = false;
        this.udpTimeoutTimer = false;
    },
    start: function() {

        var self = this;
        return this.lookup()
            .then(function() {
                return self.run();
            });

    },
    lookup: function() {
        var deferred = Q.defer();

        if (!('host' in this.options))
            deferred.reject('No host specified');

        if (this.options.host.match(/\d+\.\d+\.\d+\.\d+/)) {
            if (this.options.debug) {
                console.log('IP matched: ' + this.options.host);
            }
            this.options.address = this.options.host;
            deferred.resolve();
        } else {
            var self = this;
            return lookup(this.options.host).then(function(address) {
                if (self.options.debug) {
                    console.log('Looked up: ' + self.options.host + ' resolved to: ' + address);
                }
                self.options.address = address;
                deferred.resolve();
            });
        }

        return deferred.promise;
    },
    udpSend: function(buffer) {

        var deferred = Q.defer(),
            self = this;

        if (!('port' in this.options)) {
            return deferred.reject('Attempted to send without setting a port');
        }
        if (!('address' in this.options)) {
            return deferred.reject('Attempted to send without setting an address');
        }
        if (typeof buffer === 'string') {
            buffer = new Buffer(buffer, 'binary');
        }

        process.nextTick(function() {
            self.udpSocket.send(buffer, 0, buffer.length, self.options.port, self.options.address, function() {
                if (self.options.debug) {
                    console.log('Sent buffer: ' + buffer);
                }
            });
            self.udpTimeoutTimer = setTimeout(function() {
                if (!self.finished) {
                    return self.deferred.reject('Timeout');
                }
            }, self.options.timeout || 3000);
        });

        return deferred.promise;
    },
    udpResponse: function(buffer) {
        this.finished = true;
        clearTimeout(this.udpTimeoutTimer);
        if (this.options.parse) {
            this.deferred.resolve(this.parse(buffer));
        } else {
            this.deferred.resolve(buffer);
        }
        if (this.options.debug) {
            console.log('Received response: ' + buffer);
        }
    },
});
