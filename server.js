//dependencies
var express = require('express');
var app = express();
var flash = require("connect-flash");


var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
// var force = (process.argv[2] || "false") == "true";
var program = require('commander');

app.use(express.static('./public'));

program
    .option('-f, --force', 'Force Initialization of Schema')
    .parse(process.argv);



//ports
var PORT = process.env.port || 5000;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//models
var models = require('./models');

//routes
var authRoute = require('./routes/auth-route.js')(app);
var treeRoute = require('./routes/tree-route.js')(app);
var childRoute = require('./routes/child-route.js')(app);

// force: program.force
 
//sync database
models.sequelize.sync({  }).then(function () {
    console.log('db looks fine');
}).catch(function (err) {
    console.log("something went wrong");
})


// checks for errors
app.listen(PORT, function (err) {
    if (!err)
        console.log('site is live');
    else console.log(err);
})