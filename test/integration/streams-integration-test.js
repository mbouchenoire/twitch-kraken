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

describe('[integration] TwitchKraken#getStreams', function() {

    var client = new twitch.Client();

    it('should callback a list of getStreams', function(done) {
        var streamsNumber = 37;

        client.getStreams(streamsNumber, function(err, streams) {
            (!err).should.be.true;

            streams.length.should.equal(streamsNumber);

            streams.forEach(function(stream) {


                //stream.should.have.ownProperty('_id');
                stream.should.have.ownProperty('game');
                stream.should.have.ownProperty('viewers');
                stream.should.have.ownProperty('channel');

            });

            done();
        });
    });

    it('should not callback an error', function(done) {
        client.getStreams(function(err, streams) {
            (!err).should.be.true;
            done();
        });
    });
});

describe('[integration] TwitchKraken#getGames', function() {

    var client = new twitch.Client();

    it('should callback a list of games', function(done) {

        client.getGames(function(err, games) {
            (!err).should.be.true;

            games.forEach(function(game) {
                game.should.have.ownProperty('game');
                game.should.have.ownProperty('viewers');
            });

            done();
        });
    });

    it('should not callback an error', function(done) {
        client.getGames(function(err, games) {
            (!err).should.be.true;
            done();
        });
    });
});

describe('[integration] TwitchKraken#getEmoticons', function() {

    var client = new twitch.Client();

    it('should callback a list of emoticons', function(done) {
        client.getEmoticons('riotgames', function(err, emoticons) {
            (!err).should.be.true;

            emoticons.forEach(function(emoticon) {
                emoticon.should.have.ownProperty('regex');
                emoticon.should.have.ownProperty('url');
            });

            done();
        });
    });

    it('should not callback an error', function(done) {
        client.getEmoticons('riotgames', function(err, emoticons) {
            (!err).should.be.true;
            done();
        });
    });

});

describe('[integration] TwitchKraken#getVideo', function() {

    var client = new twitch.Client();

    it('should callback a video', function(done) {

        client.getVideo('a328087483', function(err, video) {
            //(!err).should.be.true;
            //todo test err

            video.should.have.property('title');
            video.should.have.property('description');

            done();
        });
    });

    it('should not callback an error', function(done) {
        client.getVideo('a328087483', function(err, video) {
            (!err).should.be.true;
            done();
        });
    });
});


describe('[integration] TwitchKraken#getTeams', function() {

    var client = new twitch.Client();

    it('should callback a list of teams', function(done) {
        client.getTeams(function(err, teams) {
            (!err).should.be.true;

            teams.forEach(function(team) {
                team.should.have.ownProperty('name');
                team.should.have.ownProperty('logo');
            });

            done();
        });
    });

    it('should not callback an error', function(done) {
        client.getTeams(function(err, teams) {
            (!err).should.be.true;
            done();
        });
    });

});

