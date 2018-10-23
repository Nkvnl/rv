var express = require("express"); // call express
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var compression = require('compression');
var app = express();
var path = require('path');
var robots = require('express-robots-txt');
var sitemap = require('express-sitemap');



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(robots({ UserAgent: '*', Disallow: '' }))
app.use((req, res, next) => {
    res.header('Cache-Control', 'max-age=2592000000');
    next();
});

app.get('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https')
        res.redirect('http://www.ruimtevrij.nl' + req.url)
    else
        next() /* Continue to other routes if we're not redirecting */
})
sitemap({
    map: {
        '/': ['get'],
        '/prijzen': ['get'],
        '/contact': ['get'],
        '/oefenruimte': ['get'],
        '/opslagruime': ['get'],
        '/avg': ['get'],
    },
    route: {
        '/': {

        },
        '/prijzen': {

        },
        '/contact': {

        },
        '/oefenruimte': {

        },
        '/opslagruimte': {

        },
        '/avg': {

        },

    },
}).XMLtoFile();

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/opslagruimte", function(req, res) {
    res.render("opslagruimte");
});

app.get("/oefenruimte", function(req, res) {
    res.render("oefenruimte");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/prijzen", function(req, res) {
    res.render("prijzen");
});

app.get("/avg", function(req, res) {
    res.render("avg");
});

app.get("/bedankt", function(req, res) {
    res.render("bedankt");
});

app.post("/send", (req, res) => {
    var name = (req.body.name);
    var output = `
    <h3> Nieuw bericht van ${req.body.name}.<h3>
    <h5> Details <h5>
    <ul>
        <li>Naam : ${req.body.name}</li>
        <li>Email : ${req.body.email}</li>
        <li>Onderwerp : ${req.body.ondw}</li>
    </ul>
    <p>${req.body.bericht}<p>
    `;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'mailserver163@gmail.com',
            pass: 'HIB56JIB79BONc'
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"3DWD" <mailserver163@gmail.com>', // sender address
        to: 'info@ruimtevrij.nl', // list of receivers
        subject: name + ' Heeft een bericht gestuurd via Ruimtevrij.nl.', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    var msg = "Bedankt voor je bericht! Binnen 24 uur zijn we bij je terug."
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.render("bedankt")

    });
});

app.listen(process.env.PORT, process.env.IP, function() { // tell node to listen & define a port to view app
    console.log("3D Web Dev server starting...");
});
