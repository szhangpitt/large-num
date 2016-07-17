'use strict';

var largeNum = require('../index');
var assert = require('assert');


function makeit (val, label, fn, args) {
    return function () {
        it('converts ' + val + ' --> ' + label, function () {
            var res = fn.apply(null, [].concat(args));
            assert.equal(res, label);
        });
    }
}

describe('large-num, default 0 digits', function () {
    var set = [
        [1, '1'],
        [12, '12'],
        [123, '123'],
        [1234, '1k'],
        [12345, '12k'],
        [123456, '123k'],
        [1234567, '1m'],
        [12345678, '12m'],
        [123456789, '123m'],
        [1234567890, '1b'],
        [1234567890123, '1234b'],
        [8888888, '8m'],
        [1000, '1k'],
        [1000000, '1m'],
        [1000000000, '1b'],
    ];

    set.forEach(function (s) {
        var val = s[0];
        var label = s[1];

        makeit(val, label, largeNum, val)();
    });
});


describe('large-num, with digits, disable .0s by default', function () {
    var options = { digits: 1 };
    var set = [
        [1, '1'],
        [12, '12'],
        [123, '123'],
        [1234, '1.2k'],
        [12345, '12.3k'],
        [123456, '123.4k'],
        [1234567, '1.2m'],
        [12345678, '12.3m'],
        [123456789, '123.4m'],
        [1234567890, '1.2b'],
        [1234567890123, '1234.5b'],
        [8888888, '8.8m'],
        [1000, '1k'],
        [1000000, '1m'],
        [1000000000, '1b'],
    ];


    set.forEach(function (s) {
        var val = s[0];
        var label = s[1];

        makeit(val, label, largeNum, [val, options])();
    });
});


describe('large-num, with digits, enable .0', function () {
    var options = { digits: 1, dotZeros: true };
    var set = [
        [1000, '1.0k'],
        [1000000, '1.0m'],
        [1000000000, '1.0b'],
    ];


    set.forEach(function (s) {
        var val = s[0];
        var label = s[1];

        makeit(val, label, largeNum, [val, options])();
    });
});


