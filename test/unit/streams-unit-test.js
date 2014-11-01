/**
 * Created by Maxime Bouchenoire on 31/10/2014.
 */

var Twitch = require('../../../twitch-kraken');
var should = require('should');

describe('Streams', function() {

    var twitch = new Twitch();

    it("should return false if callback isn't passed", function() {
        twitch.streams().should.be.false;
        twitch.streams(true).should.be.false;
        twitch.streams({key: 'value'}).should.be.false;
    });

});