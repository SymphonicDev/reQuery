module.exports = require('../../core').extend({
    run: function() {
        return this.udpSend('\xff\xff\xff\xffgetstatus\x00');
    },
    parse: function(buffer) {
        var data = buffer.toString();
        var players = data.split(/\\/).pop().split(/\n/);
        var result = [];
        players.shift();
        players.pop();
        players.forEach(function(player) {
            var s = player.split(' ');
            result.push({
                name: s[2].replace(/"/g, ''),
                ping: parseInt(s[1]),
                score: parseInt(s[0])
            });
        });
        return result;
    }
});
