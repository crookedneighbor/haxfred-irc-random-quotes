var Haxfred,
    request = require("request"),
    quote = "http://quotes.stormconsultancy.co.uk/random.json";

var haxfred_irc_random_quotes = function(haxfred) {
  Haxfred = haxfred;

  var wantsQuote = function(sample){
    var triggers = ["code", "programming", "node", "perl", "python", "json", "xml", "ruby", "rails", "swift", "objective c", "{", "<", "function", "var" "//", "/*", "for ("],
        randomNum = Math.random();

    if(randomNum > .33) {
        return false;
    }

    for (var i = 0; i < triggers.length; i++) {
        if(~sample.toLowerCase().indexOf(triggers[i])){ 
            return true;
        }
    }

    return false;
  }

  var getQuote = function() {
    request({
       url: quote,
       json: true
    }, function(error, response, body) {

       if(!error && response.statusCode === 200) {
          haxfred.irc.say('"' + body.quote +'" ~ ' + body.author);
       } 
    })
  }

  haxfred.on('irc.msg', '', function(data, deferred) {
    var from = data.from,
        message = data.content;
    if (wantsQuote(message)) {
      console.log("attempting to retrieve quote");
      getQuote();
    }
    deferred.resolve();
  });

};

module.exports = haxfred_irc_random_quotes;
