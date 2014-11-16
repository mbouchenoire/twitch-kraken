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

describe('[unit] Client#geStreams', function() {

    var client = new twitch.Client();

    it("should return false if callback isn't passed", function() {
        client.getStreams().should.be.false;
        client.getStreams(true).should.be.false;
        client.getStreams({key: 'value'}).should.be.false;
    });

});

describe('[unit] Client#getGames', function() {

    var client = new twitch.Client();

    it("should return false if callback isn't passed", function() {
        client.getGames().should.be.false;
        client.getGames(true).should.be.false;
        client.getGames({key: 'value'}).should.be.false;
    });

});

describe('[unit] Client#getEmoticons', function() {

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

describe('[unit] Client#getVideo', function() {

    var client = new twitch.Client();

    it("should return false if id isn't passed", function() {
        client.getVideo().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.getVideo('3', {key: 'value'}).should.be.false;
        client.getVideo(3, true).should.be.false;
    });

});

describe('[unit] Client#getTeams', function() {

    var client = new twitch.Client();

    it("should return false if callback isn't passed", function() {
        client.getEmoticons('channel', {key: 'value'}).should.be.false;
        client.getEmoticons('channel', true).should.be.false;
    });

});

describe('[unit] Client#getTeam', function() {

    var client = new twitch.Client();

    it("should return false if id isn't passed", function() {
        client.getTeam().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.getTeam('eg', {key: 'value'}).should.be.false;
        client.getTeam('eg', true).should.be.false;
    });

});

describe('[unit] Client#getChannel', function() {

    var client = new twitch.Client();

    it("should return false if id isn't passed", function() {
        client.getChannel().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.getChannel('riotgames', {key: 'value'}).should.be.false;
        client.getChannel('riotgames', true).should.be.false;
    });

});

describe('[unit] Client#getStream', function() {

    var client = new twitch.Client();

    it("should return false if id isn't passed", function() {
        client.getStream().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.getStream('riotgames', {key: 'value'}).should.be.false;
        client.getStream('riotgames', true).should.be.false;
    });

});

describe('[unit] Client#searchChannels', function() {

    var client = new twitch.Client();

    it("should return false if query string isn't passed", function() {
        client.searchChannels().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.searchChannels('lol').should.be.false;
        client.searchChannels('lol', {key: 'value'}).should.be.false;
        client.searchChannels('lol', true).should.be.false;
    });

});

describe('[unit] Client#searchStreams', function() {

    var client = new twitch.Client();

    it("should return false if query string isn't passed", function() {
        client.searchStreams().should.be.false;
    });

    it("should return false if callback isn't passed", function() {
        client.searchStreams('lol').should.be.false;
        client.searchStreams('lol', {key: 'value'}).should.be.false;
        client.searchStreams('lol', true).should.be.false;
    });

});