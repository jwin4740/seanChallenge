var db = require('../models');
var exports = module.exports = {};

exports.index = function (req, res) {
    
    res.render('index', {});
}


exports.main = function (req, res) {
    res.redirect("index", {});
}

 