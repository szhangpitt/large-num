'use strict';

function largeNum (input, options) {
    if (isNaN(input)) {
        return '';
    }

    var opts = options || {};
    var step         = opts.step || 1e3;
    var units        = opts.units || ['', 'k', 'm', 'b'];
    var digits       = opts.digits || 0;
    var dotZeros     = opts.dotZeros || false;


    var val = input;
    var u = 0;
    var label;

    while (val >= step && u < units.length - 1) {
        val = val / step;
        u += 1;
    }

    var int = Math.floor(val) + '';
    var decimals = (val - int) + '';
    decimals = decimals.substr(decimals.indexOf('.') + 1, digits);
    var allZero = /0+/.test(decimals);

    if (!digits) {
        return int + units[u];
    }

    if (!dotZeros && allZero) {
        return int + units[u];
    }

    return int + '.' +  decimals + units[u];

}

module.exports = largeNum;
