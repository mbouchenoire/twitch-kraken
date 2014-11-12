/**
 *
 * Copyright (C) <2014> <Maxime Bouchenoire>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
 * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
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

    for(var i = 0; i < parts; i++) {
        var offset = (i * 25);
        var url = TWITCH_API + 'streams?number=' + 25 + '&offset=' + offset;
        urls.push(url);
    }

    var asyncProperties = {};

    for(var i = 0; i < urls.length; i++) {
        var index = i;
        asyncProperties[i] = function(callback) {
            return retrieveResource(urls[index], function(err, body) {
                var streams = body.streams;
                if (!streams) err = new Error('Failed to parse the resource in order to get the games list!');
                callback(err, streams);
            });
        }
    }

    async.parallel(asyncProperties, function(err, results) {
        var streams = [];

        for(var i = 0; i < Object.keys(results).length; i++) {
            streams = streams.concat(results[i]);
        }

        streams = streams.slice(0, number);

        callback(null, streams);
    });
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
Client.prototype.getGames = function(callback) {
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'games/top', function (err, body) {
        var games = body.top;
        if (!games) err = new Error('Failed to parse the resource in order to get the games list!');
        callback(err, games);
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

Client.prototype.getVideo = function(id, callback) {
    if (!id) return false;
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'videos/' + id, function (err, body) {
        if (!body) err = new Error('Failed to parse the resource in order to get the video!');
        callback(err, body);
    });
}

Client.prototype.getTeams = function(callback) {
    if (!callback || typeof callback != 'function') return false;

    return retrieveResource(TWITCH_API + 'teams', function (err, body) {
        var teams = body.teams;
        if (!teams) err = new Error('Failed to parse the resource in order to get the teams list!');
        callback(err, teams);
    });
}

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
            } catch(err) {
                ex = err;
            }

            callback(ex, body);
        }
    })
}

/**
 *
 * @param channel the channel (stream) from which we want the emoticons list
 * @returns the bufferized list of emoticons of the specified channel. The buffer is updated every script's reboot (at the moment).
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