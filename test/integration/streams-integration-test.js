/*
 * The MIT License
 *
 * Copyright (c) 2014 Maxime Bouchenoire https://github.com/mbouchenoire
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

var twitch = require('../../../twitch-kraken');
var should = require('should');

describe('[integration] Client#getStreams', function () {

    var client = new twitch.Client();

    it('should callback a list of streams', function (done) {
        var streamsNumber = 37;

        client.getStreams(streamsNumber, function (err, streams) {
            (!err).should.be.true;

            streams.length.should.equal(streamsNumber);

            streams.forEach(function (stream) {


                //stream.should.have.ownProperty('_id');
                stream.should.have.ownProperty('game');
                stream.should.have.ownProperty('viewers');
                stream.should.have.ownProperty('channel');

            });

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getStreams(function (err, streams) {
            (!err).should.be.true;
            done();
        });
    });
});

describe('[integration] Client#getGames', function () {

    var client = new twitch.Client();

    it('should callback a list of games', function (done) {

        client.getGames(function (err, games) {
            (!err).should.be.true;

            games.forEach(function (game) {
                game.should.have.ownProperty('game');
                game.should.have.ownProperty('viewers');
            });

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getGames(function (err, games) {
            (!err).should.be.true;
            done();
        });
    });
});

describe('[integration] Client#getEmoticons', function () {

    var client = new twitch.Client();

    it('should callback a list of emoticons', function (done) {
        client.getEmoticons('riotgames', function (err, emoticons) {
            (!err).should.be.true;

            emoticons.forEach(function (emoticon) {
                emoticon.should.have.ownProperty('regex');
                emoticon.should.have.ownProperty('url');
            });

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getEmoticons('riotgames', function (err, emoticons) {
            (!err).should.be.true;
            done();
        });
    });

});

describe('[integration] Client#getVideo', function () {

    var client = new twitch.Client();

    it('should callback a video', function (done) {

        client.getVideo('a328087483', function (err, video) {
            //(!err).should.be.true;
            //todo test err

            video.should.have.property('title');
            video.should.have.property('description');

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getVideo('a328087483', function (err, video) {
            (!err).should.be.true;
            done();
        });
    });
});


describe('[integration] Client#getTeams', function () {

    var client = new twitch.Client();

    it('should callback a list of teams', function (done) {
        client.getTeams(function (err, teams) {
            (!err).should.be.true;

            teams.forEach(function (team) {
                team.should.have.ownProperty('name');
                team.should.have.ownProperty('logo');
            });

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getTeams(function (err, teams) {
            (!err).should.be.true;
            done();
        });
    });

});

describe('[integration] Client#getTeam', function () {

    var client = new twitch.Client();

    it('should callback a team', function (done) {
        client.getTeam('eg', function (err, team) {
            (!err).should.be.true;

            team.should.have.ownProperty('name');
            team.should.have.ownProperty('logo');

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getTeam('eg', function (err, teams) {
            (!err).should.be.true;
            done();
        });
    });

});

describe('[integration] Client#getChannel', function () {

    var client = new twitch.Client();

    it('should callback a channel', function (done) {

        client.getChannel('riotgames', function (err, channel) {
            //(!err).should.be.true;
            //todo test err

            channel.should.have.property('display_name');
            channel.should.have.property('game');

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getChannel('riotgames', function (err, channel) {
            (!err).should.be.true;
            done();
        });
    });
});

describe('[integration] Client#getStream', function () {

    var client = new twitch.Client();

    it('should callback a stream', function (done) {

        client.getStream('riotgames', function (err, stream) {
            //(!err).should.be.true;
            //todo test err

            stream.should.have.property('display_name');
            stream.should.have.property('game');

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.getStream('riotgames', function (err, stream) {
            (!err).should.be.true;
            done();
        });
    });
});

describe('[integration] Client#searchChannels', function () {

    var client = new twitch.Client();

    it('should callback a list of channels', function (done) {

        client.searchChannels('lol', function (err, channels) {

            channels.forEach(function (channel) {
                channel.should.have.property('display_name');
                channel.should.have.property('game');
            });

            done();
        });
    });

    it('should not callback an error', function (done) {
        client.searchChannels('lol', function (err, channels) {
            (!err).should.be.true;
            done();
        });
    });
});

