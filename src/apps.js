const hbs = require('express-hbs');
const web = require("express")();
const bodyParser = require("body-parser");
const path = require('path');

const config = require("./config.json");

global.__basedir = __dirname;

web.use(require('helmet')());
web.use(bodyParser.urlencoded({
    extended: true
}));
web.use(bodyParser.json());

web.engine('hbs', hbs.express4({
    partialsDir: path.join(__basedir, '/views/partials')
}));
web.set('view engine', 'hbs');
web.set('views', path.join(__basedir, '/views/layouts'));

web.use(require("./routes"));

web.listen(config.port, () => {
    console.log("Express port : " + config.port);
});