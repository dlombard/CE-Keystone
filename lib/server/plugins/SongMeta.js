var moment = require('moment')
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var logger = require('winston')
var newMeta = () => {
    var meta = {
        totalViews: 1,
        stats: [{
            year: moment().year(),
            week: moment().isoWeek(),
            day: moment().isoWeekday(),
            views: 1
        }]

    }

    return meta;

}

module.exports = exports = (schema, options) => {
    schema.add({
        meta: {
            totalViews: { type: Number, default: 0 },
            stats: [
                {
                    year: { type: Number },
                    week: { type: Number },
                    day: { type: Number, min: 1, max: 7 },
                    views: { type: Number }
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
            console.log('last item exist')
            if (lastItem.year === moment().year() && lastItem.week === moment().isoWeek() && lastItem.day === moment().isoWeekday()) {
                console.log('incrementing todays count')
                mongoose.model('Song').findOneAndUpdateAsync({ '_id': ObjectId(result._id), 'meta.stats': { '$elemMatch': { 'year': moment().year(), 'week': moment().isoWeek(), 'day': moment().isoWeekday() } } }, { '$inc': { 'meta.stats.$.views': 1, 'meta.totalViews': 1 } }).
                    then((res) => { }).
                    catch((err) => { logger.log('error', err) })
            }
            else {
                console.log('Creating todays count')
                const stats = {
                    year: moment().year(),
                    week: moment().isoWeek(),
                    day: moment().isoWeekday(),
                    views: 1
                }
                console.log(`stats: ${JSON.stringify(stats)}`)
                mongoose.model('Song').updateOneAsync({ '_id': ObjectId(result._id) }, { '$addToSet': { 'meta.stats': stats }, '$inc': { 'meta.totalViews': 1 } }).
                    then((res) => { }).
                    catch((err) => { logger.log('error', err) })
            }
        } else {
            var meta = newMeta()
            console.log('No meta exists: creating')
            mongoose.model('Song').updateOneAsync({ '_id': ObjectId(result._id) }, { '$set': { meta } })
        }

    })
    if (options && options.index) {
        schema.path('meta').index({ 'meta.stats.year': 1, 'meta.stats.week': 1, 'meta.stats.day': 1 }, { unique: true })
        schema.path('meta').index({ 'meta.totalViews': 1 })
    }
}