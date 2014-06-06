haxfred-irc-random-quotes
=========================

Component to listen for a set of keywords in chat, and when found, pull a random quote from a json api and have Haxfred say the quote.

#### Requirements

[haxfred-irc](https://github.com/haxiom/haxfred-irc)

#### Configuration

By default, this component pulls its random quotes from http://quotes.stormconsultancy.co.uk/random.json. This can be configured by adding these parameters to your Haxfred config.json file (default values shown below)

```json
"randomQuotes": {
    "url":  "http://quotes.stormconsultancy.co.uk/random.json",
    "quote": "quote",
    "author": "author",
    "triggers": ["code", "programming", "node", "perl", "python", "json", "xml", "ruby", "rails", "swift", "objective c", "{", "<", "function", "var", "//", "/*", "for ("],
    "percent": 0.33
}
```
