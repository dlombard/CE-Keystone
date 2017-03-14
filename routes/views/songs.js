var async = require('async'),
    keystone = require('keystone');

var Song = keystone.list('Song');
var _ = require('lodash')

exports.get = function (req, res) {
    console.log(_.capitalize(req.params.book))
    res.render('index')


}