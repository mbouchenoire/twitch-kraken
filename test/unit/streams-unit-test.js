/*
 * Copyright (C) <2014> <Maxime Bouchenoire>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * NY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
 * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

var Twitch = require('../../../twitch-kraken');
var should = require('should');

describe('[unit] TwitchKraken#streams', function() {

    var twitch = new Twitch();

    it("should return false if callback isn't passed", function() {
        twitch.streams().should.be.false;
        twitch.streams(true).should.be.false;
        twitch.streams({key: 'value'}).should.be.false;
    });

    it('should callback an error if offset is greater than number', function() {
        twitch.streams({
            number: 5,
            offset: 7
        }, function(err, streams) {
            err.should.exist;
        });
    })

});

describe('[unit] TwitchKraken#games', function() {

    var twitch = new Twitch();

    it("should return false if callback isn't passed", function() {
        twitch.games().should.be.false;
        twitch.games(true).should.be.false;
        twitch.games({key: 'value'}).should.be.false;
    });

    it('should callback an error if offset is greater than number', function() {
        twitch.streams({
            number: 5,
            offset: 7
        }, function(err, games) {
            err.should.exist;
        });
    })

});

describe('[unit] TwitchKraken#emoticons', function() {

    var twitch = new Twitch();

    it("should return false if channel isn't passed", function() {
        twitch.emoticons().should.be.false;
    });

    it("should return false if channel isn't a string", function() {
        twitch.emoticons(true).should.be.false;
        twitch.emoticons({key: 'value'}).should.be.false;
        twitch.emoticons(function() {}).should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        twitch.emoticons('channel', {key: 'value'}).should.be.false;
        twitch.emoticons('channel', true).should.be.false;
    });

});