var browserify = require('browserify-middleware');
var express = require('express');
var app = express()

var port = process.env.PORT || 3000

app.use('/public/bundle.js', browserify(__dirname + '/source/index.js'));

app.use(express.static('public'));

app.get('/', function (req, resp) {
	resp.sendFile(__dirname + '/views/index.html')
});

var listener = app.listen(port, function () {
	console.log('Your app is listening on port '+ listener.address().port);
})
