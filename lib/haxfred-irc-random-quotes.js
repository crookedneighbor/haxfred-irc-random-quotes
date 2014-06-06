var Haxfred,
    request = require("request");

var haxfred_irc_random_quotes = function(haxfred) {
  Haxfred = haxfred;
  var quoteUrl = "http://quotes.stormconsultancy.co.uk/random.json",
      quote = "quote", 
      author = "author",
      triggers = ["code", "programming", "node", "perl", "python", "json", "xml", "ruby", "rails", "swift", "objective c", "{", "<", "functi    on", "var", "//", "/*", "for ("],
      percent = 0.33;

  if(Haxfred.config.randomQuotes) {
    quoteUrl = Haxfred.config.randomQuotes.url || "http://quotes.stormconsultancy.co.uk/random.json";
    quote = Haxfred.config.randomQuotes.body || "quote";
    author = Haxfred.config.randomQuotes.author || "author";
    triggers = Haxfred.config.randomQuotes.triggers || ["code", "programming", "node", "perl", "python", "json", "xml", "ruby", "rails", "swift", "objective c", "{", "<", "function", "var", "//", "/*", "for ("];
    percent = Haxfred.config.randomQuotes.percent || 0.33;
  }

  var wantsQuote = function(sample){
    var randomNum = Math.random();

    if(randomNum > percent) {
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
       url: quoteUrl,
       json: true
    }, function(error, response, body) {

       if(!error && response.statusCode === 200) {
         var haxfredSays = '"' + body[quote] + '"';
         if(author && author.toLowerCase() != "none") {haxfredSays = haxfredSays + ' ~ ' + body[author];}
         haxfred.irc.say(haxfredSays);
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
