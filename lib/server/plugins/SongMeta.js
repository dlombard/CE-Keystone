var moment = require('moment')
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
module.exports = exports = (schema, options) => {
    schema.add({
        meta: {
            totalViews: { type: Number },
            stats: [
                {
                    year: { type: Number },
                    week: { type: Number },
                    day: { type: Number, min: 1, max: 7 },
                    views: { type: Number },
                }
            ]
        }
    })

    schema.post('findOne', (result) => {
        var lastItem = []
        if (result.meta.stats) {
            lastItem = result.meta.stats.pop()
        }
        if (lastItem) {
            if (lastItem.year === moment().year() && lastItem.week === moment().isoWeek() && lastItem.day === moment().isoWeekday()) {

                mongoose.model('Song').findOneAndUpdateAsync({ '_id': ObjectId(result._id), 'meta.stats': { '$elemMatch': { 'year': moment().year(), 'week': moment().isoWeek(), 'day': moment().isoWeekday() } } }, { '$inc': { 'meta.stats.$.views': 1, 'meta.totalViews': 1 } }).then((res, err) => { if (err) console.log(err); })
            }
            else {
                newMeta(result)
            }
        } else {
            newMeta(result)
        }

    })
    if (options && options.index) {
        schema.path('meta').index({ 'meta.stats.year': 1, 'meta.stats.week': 1, 'meta.stats.day': 1 }, { unique: true })
        schema.path('meta').index({ 'meta.totalViews': 1 })
    }
}

var newMeta = (result) => {
    var meta = {
        totalViews: 1,
        stats: [{
            year: moment().year(),
            week: moment().isoWeek(),
            day: moment().isoWeekday(),
            views: 1
        }]

    }
    mongoose.model('Song').updateOneAsync({ '_id': ObjectId(result._id) }, { '$set': { 'meta': meta } })

}