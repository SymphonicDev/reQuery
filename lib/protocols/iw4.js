module.exports = require('../core').extend({
    init: function() {
        this._super();
        this.sendHeader = 'getinfo';
    },
    run: function() {
        return this.udpSend('\xff\xff\xff\xff' + this.sendHeader + '\x00');
    },
    parse: function(buffer) {
        var data = buffer.toString();
        var state = data.split('\\');
        state.shift();
        var arr = {};
        if (data.length === 26) {
            arr.hostname = data[25].slice(0, -1);
            arr.mod = data[7].replace("mods/", "");
            arr.gametype = this.resolveGametype(data[11]);
            arr.clients = parseInt(data[17]);
            arr.maxclients = parseInt(data[13]);
            arr.mapname = this.resolveMap(data[19]);
        } else if (data.length === 24) {
            arr.hostname = data[23].slice(0, -1);;
            arr.mod = '';
            arr.gametype = this.resolveGametype(data[9]);
            arr.clients = parseInt(data[15]);
            arr.maxclients = parseInt(data[11]);
            arr.mapname = this.resolveMap(data[17]);
        } else {
            arr.hostname = '';
            arr.mod = '';
            arr.gametype = '';
            arr.clients = '';
            arr.maxclients = '';
            arr.mapname = '';
        }
        return arr;
    }
});
