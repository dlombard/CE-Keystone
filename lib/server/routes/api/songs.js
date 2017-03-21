var async = require('async'),
    keystone = require('keystone');

var Song = keystone.list('Song');
var _ = require('lodash')
/**
 * List Songs
 */
exports.list = function (req, res) {
    Song.model.find({ 'book.abbrv': _.upperCase(req.params.book) }, function (err, items) {

        if (err) return res.apiError('database error', err);

        res.send({
            songs: items
        });

    });
}

/**
 * Get Song by ID
 */
exports.get = function (req, res) {
    Song.model.findById(req.params.id).exec(function (err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        res.send({
            song: item
        });

    });
}
