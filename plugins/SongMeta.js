var moment = require('moment')
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
module.exports = exports = (schema, options) => {
    schema.add({
        meta: [{
            year: { type: Number },
            week: { type: Number },
            day: { type: Number, min: 1, max: 7 },
            views: { type: Number },

        }]
    })

    schema.post('findOne', function (result) {

        if (result.meta.length > 0) {
            mongoose.model('Song').findOneAndUpdateAsync({ '_id': ObjectId(result._id), 'meta':{'$elemMatch': {'year': moment().year(), 'week': moment().isoWeek(), 'day': moment().isoWeekday()}}  }, { '$inc': { 'meta.$.views': 1 } }).then((res, err) => { if (err) console.log(err);  })
        } else {
            var meta = {
                year: moment().year(),
                week: moment().isoWeek(),
                day: moment().isoWeekday(),
                views: 1
            }

            mongoose.model('Song').findOneAndUpdateAsync({ '_id': ObjectId(result._id) }, { '$push': { 'meta': meta } })
        }

    })
    if (options && options.index) {
        schema.path('meta').index({ 'meta.year': 1, 'meta.week': 1, 'meta.day': 1 }, { unique: true })
    }
}
