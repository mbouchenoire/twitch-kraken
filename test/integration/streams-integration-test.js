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

describe('Streams integration test', function() {

    var twitch = new Twitch();

    it('should return a list of streams', function() {
        var streamsNumber = 6;

        var args = {
            number: streamsNumber,
            offset: 0
        }

        twitch.streams(args, function(streams) {

            streams.should.have.length(streamsNumber);

            streams.forEach(function(stream) {

                oneStream.should.have.ownProperty('_id');
                oneStream.should.have.ownProperty('game');
                oneStream.should.have.ownProperty('viewers');
                oneStream.should.have.ownProperty('channel');

            })

        })

    })

})
