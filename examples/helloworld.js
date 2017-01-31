var unit = require('../build/unit');
var cont = require('../build/cont');

function wait(time, result) {
    return function(f) {
        setTimeout(function() {
            f(result);
        }, time);
    };
}

function log(arg) {
    return function(f) {
        console.log(arg);
        f(unit.unit);
    };
}

var program = cont.forever(cont.chain(wait(2000, "Hello world"), log));

cont.go(program);
