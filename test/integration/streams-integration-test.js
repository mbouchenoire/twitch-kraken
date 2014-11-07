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

describe('[integration] TwitchKraken#geStreams', function() {

    var twitch = new Twitch();

    it('should callback a list of geStreams', function() {
        var streamsNumber = 6;

        var args = {
            number: streamsNumber,
            offset: 0
        }

        twitch.geStreams(args, function(err, streams) {
            //err.should.not.exist;
            //TODO test for not err
            //geStreams.should.have.length(streamsNumber);

            streams.forEach(function(stream) {


                //stream.should.have.ownProperty('_id');
                stream.should.have.ownProperty('game');
                stream.should.have.ownProperty('viewers');
                stream.should.have.ownProperty('channel');

            });
        });
    });

    it('should not callback an error', function(done) {
        twitch.geStreams(function(err, streams) {
            //TODO fix this test
            //should.be.null(err);
            done();
        });
    });
});

describe('[integration] TwitchKraken#getGames', function() {

    var twitch = new Twitch();

    it('should callback a list of games', function(done) {

        twitch.getGames(function(err, games) {

            games.forEach(function(game) {
                game.should.have.ownProperty('game');
                game.should.have.ownProperty('viewers');
            });

            done();
        });
    });

    it('should not callback an error', function(done) {
        twitch.getGames(function(err, games) {
            //TODO test for not err
            //err.should.not.exist;
            done();
        });
    });
});

describe('[integration] TwitchKraken#getEmoticons', function() {

    var twitch = new Twitch();

    it('should callback a list of emoticons', function() {
        twitch.getEmoticons('riotgames', function(err, emoticons) {
            emoticons.forEach(function(err, emoticon) {
                emoticon.should.have.ownProperty('regex');
                emoticon.should.have.ownProperty('url');
            });
        });
    });

    it('should not callback an error', function() {
        twitch.getEmoticons('riotgames', function(err, emoticons) {
            emoticons.forEach(function(err, emoticon) {
                err.should.not.exist;
            });
        });
    });

});

