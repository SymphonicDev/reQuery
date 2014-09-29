# reQuery Game/Master Server Query

## Instructions
Require the library and create a new query using the following

```js
var reQ = require('./lib'); // or require('requery');

var query = reQ.query({
    type: 'iw4master', //available types are 'iw4master', 'iw4' for now.
    host: '176.57.141.201',
    port: 20810,
    timeout: 3000,
    parse: true //passing false will return a buffer.
}); //returns a promise

query.then(function(state) {
    console.log(state);
}, function(error) {
    console.log(error);
});
```

##Creating your own protocol
You can create your own protocol by extending the core from the protocols folder.

```js
module.exports = require('../core').extend({
    init: function() {
        this._super(); //this is required.
    },
    run: function() {
        return this.udpSend('your query buffer here');
    },
    parse: function(buffer) {
        //If you want to parse your buffer into readable data, you can do it here.
        //Make sure you pass {parse: true} in your options.
    }
})
```