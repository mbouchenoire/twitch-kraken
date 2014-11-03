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

describe('[integration] TwitchKraken#streams', function() {

    var twitch = new Twitch();

    it('should callback a list of streams', function() {
        var streamsNumber = 6;

        var args = {
            number: streamsNumber,
            offset: 0
        }

        twitch.streams(args, function(err, streams) {
            streams.should.have.length(streamsNumber);

            streams.forEach(function(err, stream) {
                err.should.not.exist;

                stream.should.have.property('_id');
                stream.should.have.property('game');
                stream.should.have.property('viewers');
                stream.should.have.property('channel');

            });
        });
    });

    it('should not callback an error', function() {
        twitch.streams(function(err, streams) {
            err.should.not.exist;
        });
    });
});

describe('[integration] TwitchKraken#games', function() {

    var twitch = new Twitch();

    it('should callback a list of games', function() {
        var gamesNumber = 6;

        var args = {
            number: gamesNumber,
            offset: 0
        }

        twitch.games(args, function(err, games) {

            games.should.have.property('top');
            var top = games.top;

            top.forEach(function(game) {
                game.should.have.property('game');
                game.should.have.property('logo');
            });

        });
    });

    it('should not callback an error', function() {
        twitch.games(function(err, games) {
            err.should.not.exist;
        });
    });
});

describe('[integration] TwitchKraken#emoticons', function() {

    var twitch = new Twitch();

    it('should callback a list of emoticons', function() {
        twitch.emoticons('riotgames', function(err, emoticons) {
            emoticons.forEach(function(err, emoticon) {
                emoticon.should.have.ownProperty('regex');
                emoticon.should.have.ownProperty('url');
            });
        });
    });

    it('should not callback an error', function() {
        twitch.emoticons('riotgames', function(err, emoticons) {
            emoticons.forEach(function(err, emoticon) {
                err.should.not.exist;
            });
        });
    });

});

