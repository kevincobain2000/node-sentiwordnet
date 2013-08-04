var should = require('should');
var main = require('../lib/main');

describe('sentiwordnet', function() {
    describe('with no arguments', function() {
        it('returns an empty array', function() {
            var result = senti();
            result.should.eql(1);
            done();
        });
    });
});
//
