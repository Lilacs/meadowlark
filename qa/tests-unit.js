/**
 * Created by Q on 2016/2/27.
 */
var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortunes cookies tests', function() {
    test('getFortune() should return a fortune', function () {
       expect(typeof fortune.getFortune() === 'string');
    });
});