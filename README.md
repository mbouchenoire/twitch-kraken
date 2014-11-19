# twitch-kraken [![Build Status](https://travis-ci.org/mbouchenoire/twitch-kraken.svg?branch=master)](https://travis-ci.org/mbouchenoire/twitch-kraken)

The twitch-kraken module is designed to easily access the Twitch(.tv) API, which is documented [here](https://github.com/justintv/twitch-api). The goal is to heavily document and test the module, making it robust and very easy to use.

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

## Development Setup

Please follow the instructions below to setup your development environment.

1) Clone this repository onto your local development machine:

    $ git clone https://github.com/mbouchenoire/twitch-kraken.git
    $ cd twitch-kraken

2) Install [Node](http://nodejs.org/#download).

3) Install dependencies. This will take a while.

    $ npm install

4) Run tests

    $ npm test

## Contributing

twitch-kraken is still in an early development phase, but everyone is free to fork it and make pull requests.


