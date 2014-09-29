module.exports = require('../../core').extend({
    run: function() {
        return this.udpSend('\xff\xff\xff\xffgetinfo\x00');
    },
    parse: function(buffer) {
        var data = buffer.toString();
        var rows = data.split('\\');
        rows.shift();
        var arr = {};
        if (rows.length === 26) {
            arr.hostname = rows[25].slice(0, -1);
            arr.mod = rows[7].replace("mods/", "");
            arr.gametype = rows[11];
            arr.clients = parseInt(rows[17]);
            arr.maxclients = parseInt(rows[13]);
            arr.mapname = rows[19];
        } else if (rows.length === 24) {
            arr.hostname = rows[23].slice(0, -1);;
            arr.mod = '';
            arr.gametype = rows[9];
            arr.clients = parseInt(rows[15]);
            arr.maxclients = parseInt(rows[11]);
            arr.mapname = rows[17];
        } else {
            arr.hostname = '';
            arr.mod = '';
            arr.gametype = '';
            arr.clients = '';
            arr.maxclients = '';
            arr.mapname = '';
        }
        arr.host = this.options.host + ':' + this.options.port;
        return arr;
    }
});
