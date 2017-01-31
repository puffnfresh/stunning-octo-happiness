var unit = require('../build/unit');
var cont = require('../build/cont');

function program(time, result) {
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

cont.go(
    cont.chain(
        program(2000, "Hello world"),
        log
    )
);
