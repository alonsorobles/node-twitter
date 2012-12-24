var express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts');

app.listen(8000);
app.set('view engine', 'ejs');
app.use(expressLayouts);

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
       if (acceptsHtml(req.headers['accept'])) {
           res.redirect('/', 302);
       } else {
           res.send({status:"ok", message:"Tweet received"});
       }
   } else {
       res.send({status:"nok", message:"No tweet received"});
   }
});

app.get('/tweets', function(req, res) {
   res.send(tweets);
});

function acceptsHtml(header) {
    var accepts = header.split(',');
    for(var i = 0; i < accepts.length; i += 1) {
        if (accepts[i] === 'text/html') { return true; }
    }
    return false;
}
