# twitch-kraken [![Build Status](https://travis-ci.org/mbouchenoire/twitch-kraken.svg?branch=master)](https://travis-ci.org/mbouchenoire/twitch-kraken)

The twitch-kraken module is designed to easily access the Twitch(.tv) API, which is documented [here](https://github.com/justintv/twitch-api).

## Overview

The goal is to heavily document and test the module, making it robust and very easy to use.

## Usage

Here's an example of a simple Twitch API client :

```js
var twitch = require('twitch-kraken');

var client = new twitch.Client();

client.getStreams(function(err, streams) {
  streams.forEach(function(stream) {
    console.log(stream.channel.name);
  });
});
```

## Running Tests

To execute all tests, use:

    npm test

## Contributing

twitch-kraken is still in an early development phase, but everyone is free to fork it and make pull requests.


