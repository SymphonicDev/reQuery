module.exports = require('../../core').extend({
    run: function() {
        return this.udpSend(this.options.buffer || '\xff\xff\xff\xffgetservers IW4 61586 full empty\x00');
    },
    parse: function(buffer) {
        var servers = [];
        var bufferString = buffer.toString('binary');
        bufferString = bufferString.slice(0, -3);
        var tempSplit = bufferString.split(/\\/);
        tempSplit.forEach(function(server) {
            var len = server.length;
            if (len == 6) {
                var ip = '';
                for (var i = 0; i < len - 2; i++) {
                    ip += server[i].charCodeAt(0) + '.';
                }
                ip = ip.slice(0, -1);
                port = (server[len - 2].charCodeAt(0) << 8) + server[len - 1].charCodeAt(0);
                servers.push({
                    ip: ip,
                    port: port
                });
            }
        });
        return servers;
    }
});
