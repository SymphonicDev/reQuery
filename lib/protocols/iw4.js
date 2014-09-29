module.exports = require('../core').extend({
    init: function() {
        this._super();
        this.pretty = 'aIW3 Dedicated Server Query';
        this.options.port = 28960;
        this.sendHeader = 'getinfo';
    },
    run: function() {
        var self = this;

        this.udpSend('\xff\xff\xff\xff' + this.sendHeader + '\x00', function(buffer) {
            var data = buffer.toString();
            if (data.indexOf('\\') !== -1) {
                var state = data.split('\\');
                state.shift();
            } else {
                state = false;
            }
            self.finish(self.parse(state));
            return true;
        });
    },
    parse: function(data){
        var arr = new Object();
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
    },
    resolveMap: function(map){
        switch (map) {
            case "mp_afghan":
                return "Afghan";
                break;
            case "mp_derail":
                return "Derail";
                break;
            case "mp_estate":
                return "Estate";
                break;
            case "mp_favela":
                return "Favela";
                break;
            case "mp_highrise":
                return "Highrise";
                break;
            case "mp_invasion":
                return "Invasion";
                break;
            case "mp_checkpoint":
                return "Karachi";
                break;
            case "mp_quarry":
                return "Quarry";
                break;
            case "mp_rundown":
                return "Rundown";
                break;
            case "mp_rust":
                return "Rust";
                break;
            case "mp_boneyard":
                return "Scrapyard";
                break;
            case "mp_nightshift":
                return "Skidrow";
                break;
            case "mp_subbase":
                return "Sub Base";
                break;
            case "mp_terminal":
                return "Terminal";
                break;
            case "mp_underpass":
                return "Underpass";
                break;
            case "mp_brecourt":
                return "Wasteland";
                break;
            case "mp_crash":
                return "Crash";
                break;
            case "mp_overgrown":
                return "Overgrown";
                break;
            case "mp_complex":
                return "Bailout";
                break;
            case "mp_compact":
                return "Salvage";
                break;
            case "mp_storm":
                return "Storm";
                break;
            case "mp_abandon":
                return "Carnival";
                break;
            case "mp_trailerpark":
                return "Trailerpark";
                break;
            case "mp_fuel2":
                return "Fuel";
                break;
            case "mp_vacant":
                return "Vacant";
                break;
            case "mp_strike":
                return "Strike";
                break;
            case "mp_nuked":
                return "Nuketown";
                break;
            case "oilrig":
                return "Oil Rig";
                break;
            case "invasion":
                return "Burger Town";
                break;
            case "iw4_credits":
                return "IW4 Test Map";
                break;
            case "gulag":
                return "Gulag";
                break;
            case "contingency":
                return "Contingency";
                break;
            case "so_ghillies":
                return "Pripyat";
                break;
            case "so_bridge":
                return "Cargoship";
                break;
            default:
                return map;
                break;
        }
    },
    resolveGametype: function(gametype){
        switch (gametype) {
            case "war":
                return "TDM";
                break;
            case "dm":
                return "FFA";
                break;
            case "dd":
                return "DEM";
                break;
            case "sd":
                return "S&D";
                break;
            case "koth":
                return "HQ";
                break;
            default:
                return gametype.toUpperCase();
                break;
        }
    }
});
