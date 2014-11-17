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

var http = require('request');
var async = require('async');

TWITCH_API = 'https://api.twitch.tv/kraken/';

//this is where the bufferized emoticons will be stored
var bufferizedEmoticons = [];

function Client() {
    // do nothing
}

/**
 * Returns a list of 'game' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v3_resources/games.md
 *
 * @param args args.number (optional): number of geStreams to retrieve
 *             args.offset (optional): offset from which you want to start to get the geStreams list
 * @param callback called when the geStreams have been retrieved, with format (err, geStreams)
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getGames = function (callback) {
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'games/top', function (err, body) {
        var games = body.top;
        if (!games) err = new Error('Failed to parse the resource in order to get the games list!');
        callback(err, games);
    });
}

/**
 * Returns a 'channel' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v3_resources/channels.md#get-channelschannel
 *
 * @param id the channel id
 * @param callback called when the channel has been retrieved, using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getChannel = function (id, callback) {
    if (!id) return false;
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + '/channels/' + id, function (err, body) {
        if (!body) err = new Error('Failed to parse the resource in order to get the stream!');
        callback(err, body);
    });
}

/**
 * Returns a 'channel' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v3_resources/channels.md#get-channelschannel
 *
 * @param id the channel id
 * @param callback called when the channel has been retrieved, using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getStream = function (id, callback) {
    return this.getChannel(id, callback);
}

/**
 * Search channels based on a query string.
 * @param queryString the string to search for
 * @param callback called when the channels corresponding to the query string have been retrieved,
 *                  using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.searchChannels = function (queryString, callback) {
    if (!queryString) return false;
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'search/channels?q=' + queryString, function (err, body) {
        var channels = body.channels;
        if (!channels) err = new Error('Failed to parse the resource in order to get the channels list!');
        callback(err, channels);
    });
}

/**
 * Search streams based on a query string.
 * @param queryString the string to search for
 * @param callback called when the streams corresponding to the query string have been retrieved,
 *                  using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.searchStreams = function (queryString, callback) {
    if (!queryString) return false;
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'search/streams?q=' + queryString, function (err, body) {
        var streams = body.streams;
        if (!streams) err = new Error('Failed to parse the resource in order to get the streams list!');
        callback(err, streams);
    });
}

/**
 * Returns a list of 'stream' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v3_resources/geStreams.md
 *
 * @param args args.number (optional): number of geStreams to retrieve
 *             args.offset (optional): offset from which you want to start to get the geStreams list
 * @param callback called when the geStreams have been retrieved, with format (err, geStreams)
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getStreams = function (number, callback) {
    if (typeof number == 'function') callback = number;
    if (!callback || typeof callback != 'function') return false;

    return retrieveStreams(number, callback);
}

function retrieveStreams(number, callback) {
    if (!callback || typeof callback != 'function') return false;

    number = number || 25;

    var parts = Math.ceil(number / 25);
    var urls = [];

    for (var i = 0; i < parts; i++) {
        var offset = (i * 25);
        var url = TWITCH_API + 'streams?number=' + 25 + '&offset=' + offset;
        urls.push(url);
    }

    var asyncProperties = {};

    for (var i = 0; i < urls.length; i++) {
        var index = i;
        asyncProperties[i] = function (callback) {
            return retrieveResource(urls[index], function (err, body) {
                var streams = body.streams;
                if (!streams) err = new Error('Failed to parse the resource in order to get the games list!');
                callback(err, streams);
            });
        }
    }

    async.parallel(asyncProperties, function (err, results) {
        var streams = [];

        for (var i = 0; i < Object.keys(results).length; i++) {
            streams = streams.concat(results[i]);
        }

        streams = streams.slice(0, number);

        callback(null, streams);
    });
}

/**
 * Returns a list of 'emoticon' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v3_resources/chat.md#get-chatemoticons
 *
 * Note that this function bufferize emoticons from a channel, as they rarely change.
 *
 * @param channel the twitch.tv channel
 * @param callback called when the emoticons have been retrieved, with format (err, geStreams)
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getEmoticons = function (channel, callback) {
    if (!channel || typeof channel != 'string') return false;
    if (!callback || typeof callback != 'function') return false;

    var emoticons = getBufferizedEmoticons(channel);

    if (emoticons != null) {
        return callback(null, emoticons);
    }

    return retrieveResource(TWITCH_API + 'chat/' + channel + '/emoticons', function (err, body) {
        emoticons = body.emoticons;
        if (!emoticons) err = new Error('Failed to parse the resource in order to get the emoticons list!');

        //TODO update the buffer every x minutes / hours
        bufferizedEmoticons.push({channel: channel, emoticons: emoticons});
        callback(err, emoticons);
    });
}

/**
 * Returns a list of 'teams' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v2_resources/teams.md#get-teams
 *
 * @param callback called when the teams have been retrieved, using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getTeams = function (callback) {
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'teams', function (err, body) {
        var teams = body.teams;
        if (!teams) err = new Error('Failed to parse the resource in order to get the teams list!');
        callback(err, teams);
    });
}

/**
 * Returns a 'team' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v2_resources/teams.md#get-teamsteam
 *
 * @param id the team id
 * @param callback called when the team has been retrieved, using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getTeam = function (id, callback) {
    if (!id) return false;
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + "teams/" + id, function (err, body) {
        if (!body) err = new Error('Failed to parse the resource in order to get the team!');
        callback(err, body);
    });
}

/**
 * Returns a 'video' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v2_resources/videos.md#get-videosid
 *
 * @param id the video id
 * @param callback called when the video has been retrieved, using an error-first callback
 * @returns {boolean} false if arguments are missing
 */
Client.prototype.getVideo = function (id, callback) {
    if (!id) return false;
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'videos/' + id, function (err, body) {
        if (!body) err = new Error('Failed to parse the resource in order to get the video!');
        callback(err, body);
    });
}

/**
 * Returns the body of the response of an HTTP GET request on an URL
 *
 * @param callback called when the response has been retrieved, using an error-first callback.
 *                  the second parameter of the callback contains the body of the response
 * @returns {boolean} false if arguments are missing
 */
function retrieveResource(url, callback) {
    if (!url || typeof url != 'string') return false;
    if (!callback || typeof callback != 'function') return false;

    http.get({
        url: url
    }, function (err, response, body) {
        //console.dir(body);
        if (err) {
            callback(err);
        } else {
            var ex = null;

            try {
                body = JSON.parse(body);
            } catch (err) {
                ex = err;
            }

            callback(ex, body);
        }
    })
}

/**
 *
 * @param channel the channel (stream) from which we want the emoticons list
 * @returns the bufferized list of emoticons of the specified channel. The buffer is updated every script's reboot
 *              (at the moment).
 */
function getBufferizedEmoticons(channel) {
    var emoticons = null;

    bufferizedEmoticons.forEach(function (buffer) {
        if (buffer.channel == channel) {
            emoticons = buffer.emoticons;
        }
    });

    return emoticons;
}

exports.Client = Client;
