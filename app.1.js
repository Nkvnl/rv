var express = require("express"); // call express
var app = express();
var path = require('path');


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 3000))

app.get('/', function(req, res) {
    res.render('index');
})

app.listen(app.get('port'), function() {
    console.log('running...');
});
