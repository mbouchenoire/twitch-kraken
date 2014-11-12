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

var twitch = require('../../../twitch-kraken');
var should = require('should');

describe('[unit] TwitchKraken#geStreams', function() {

    var client = new twitch.Client();

    it("should return false if callback isn't passed", function() {
        client.getStreams().should.be.false;
        client.getStreams(true).should.be.false;
        client.getStreams({key: 'value'}).should.be.false;
    });

});

describe('[unit] TwitchKraken#getGames', function() {

    var client = new twitch.Client();

    it("should return false if callback isn't passed", function() {
        client.getGames().should.be.false;
        client.getGames(true).should.be.false;
        client.getGames({key: 'value'}).should.be.false;
    });

});

describe('[unit] TwitchKraken#getEmoticons', function() {

    var client = new twitch.Client();

    it("should return false if channel isn't passed", function() {
        client.getEmoticons().should.be.false;
    });

    it("should return false if channel isn't a string", function() {
        client.getEmoticons(true).should.be.false;
        client.getEmoticons({key: 'value'}).should.be.false;
        client.getEmoticons(function() {}).should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.getEmoticons('channel', {key: 'value'}).should.be.false;
        client.getEmoticons('channel', true).should.be.false;
    });

});

describe('[unit] TwitchKraken#getVideo', function() {

    var client = new twitch.Client();

    it("should return false if id isn't passed", function() {
        client.getVideo().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.getVideo('3', {key: 'value'}).should.be.false;
        client.getVideo(3, true).should.be.false;
    });

});

describe('[unit] TwitchKraken#getTeams', function() {

    var client = new twitch.Client();

    it("should return false if callback isn't passed", function() {
        client.getEmoticons('channel', {key: 'value'}).should.be.false;
        client.getEmoticons('channel', true).should.be.false;
    });

});