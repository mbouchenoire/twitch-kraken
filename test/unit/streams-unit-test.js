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

describe('[unit] TwitchKraken#geStreams', function() {

    var twitch = new Twitch();

    it("should return false if callback isn't passed", function() {
        twitch.getStreams().should.be.false;
        twitch.getStreams(true).should.be.false;
        twitch.getStreams({key: 'value'}).should.be.false;
    });

});

describe('[unit] TwitchKraken#getGames', function() {

    var twitch = new Twitch();

    it("should return false if callback isn't passed", function() {
        twitch.getGames().should.be.false;
        twitch.getGames(true).should.be.false;
        twitch.getGames({key: 'value'}).should.be.false;
    });

});

describe('[unit] TwitchKraken#getEmoticons', function() {

    var twitch = new Twitch();

    it("should return false if channel isn't passed", function() {
        twitch.getEmoticons().should.be.false;
    });

    it("should return false if channel isn't a string", function() {
        twitch.getEmoticons(true).should.be.false;
        twitch.getEmoticons({key: 'value'}).should.be.false;
        twitch.getEmoticons(function() {}).should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        twitch.getEmoticons('channel', {key: 'value'}).should.be.false;
        twitch.getEmoticons('channel', true).should.be.false;
    });

});