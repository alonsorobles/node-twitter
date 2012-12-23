var express = require('express');

var app = express();
app.listen(8000);

var tweets = [];

app.get('/', function(req, res) {
    var title = 'Chirpie',
        header = 'Welcome to Chirpie';

    res.render('index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            stylesheets: ['/public/style.css']
        }
    })
});

app.post('/send', express.bodyParser(), function(req, res) {
   if (req.body && req.body.tweet) {
       tweets.push(req.body.tweet);
       res.send({status:"ok", message:"Tweet received"});
   } else {
       res.send({status:"nok", message:"No tweet received"});
   }
});

app.get('/tweets', function(req, res) {
   res.send(tweets);
});

