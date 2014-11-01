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

TWITCH_API = 'https://api.twitch.tv/kraken/';

function Twitch() {
    // do nothing
}

/**
 * Returns a list of 'stream' resource based on this documentation:
 * https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md
 *
 * @param args args.number (optional): number of streams to retrieve
 *             args.offset (optional): offset from which you want to start to get the streams list
 * @param callback called when the streams have been retrieved, with streams as only argument
 * @returns {boolean} false if arguments are missing
 */
Twitch.prototype.streams = function(args, callback) {
    if (typeof args == 'function') callback = args;
    if (!callback || typeof callback != 'function') return false;

    var number = args.number || 100;
    var offset = args.offset || 0;

    http.get({
        url: TWITCH_API + 'streams?number=' + number + '&offset=' + offset
    }, function(err, response, body) {
        if (err) {
            console.log(err);
        } else {
            body = JSON.parse(body);
            var streams = body.streams;
            if (callback) callback(streams);
        }
    })
}

module.exports = Twitch;