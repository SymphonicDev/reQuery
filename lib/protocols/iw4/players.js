module.exports = require('../../core').extend({
    run: function() {
        return this.udpSend('\xff\xff\xff\xffgetstatus\x00');
    },
    parse: function(buffer) {
        var state = buffer.toString();
        var find = state.match(/(\d+) (\d+) \"(.+)\"/g);
        var players = [];
        if (find !== null) {
            find.forEach(function(m) {
                var s = m.split(' ');
                var score = parseInt(s[0]);
                var ping = parseInt(s[1]);
                var name = s[2].replace(/"/g, '');
                players.push({
                    name: name,
                    ping: ping,
                    score: score
                });
            });
        }
        return players;
    }
});
