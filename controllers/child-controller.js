var db = require('../models');
var exports = module.exports = {};

exports.newChild = function (req, res) {
    db.Children.create({
       numValue: req.body.numValue,
       FactoryId: req.body.FactoryId
    }).then(function (result) {
        res.redirect('/index');
    })
}

exports.getChild = function (req, res) {
    console.log("HERE " + req.body.numValue);
    db.Children.findAll({
        
    }).then(function (result) {
        console.log(result);
        res.send(result);
    })
}
