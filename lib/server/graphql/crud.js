var _ = require('lodash');
var logger = require('../../../logger')

var buildFind = (model, args, opts, doc) => {

    var query = {
        model,
        where: {},
        projection: {},
        skip: {},
        limit: {},
        sort: {},
        doc
    };

    if (args.minTotalViews) {
        args['meta.totalViews'] = { '$gte': args.minTotalViews }
        delete args.minTotalViews
    }
    if (args.sortField) {
        if (_.startsWith(args.sortField, '-')) {
            query.sort[_.trimStart(args.sortField, '-')] = -1
        } else {
            query.sort[args.sortField] = 1
        }

        delete args.sortField
    }
    if (args.book === null) {
        delete args.book
    }
    if (args.book) {
        args['book.abbrv'] = args.book
        delete args.book
    }
    if (args.language === null) {
        delete args.language
    }
    if (args.first) {
        query.limit = args.first
        delete args.first
    }
    if (args.after) {
        query.where['_id'] = { '$gt': args.after }
        delete args.after
    }
    if (opts !== null) {
        if (opts.sort) {
            query.sort = opts.sort
        }
    }
    // Temporary measure to ignore GraphQL-Relay connectionArgs and remove null fields
    for (var x in args) {
        if (args[x] === null) {
            delete args[x]
        }
    }
    query.where = args;

    const data = query.model.find(query.where).
        sort(query.sort).
        limit(query.limit).
        batchSize(400).
        execAsync().
        then((results) => { return results; }).
        catch((err) => { logger.log('error', err); });

    return data
};
var buildFindOne = (model, args, opts, doc) => {

    var query = {
        model,
        where: {

        },
        projection: {

        },
        skip: {

        },
        limit: {

        },
        sort: {

        },
        doc
    };
    if (opts !== null) {
        if (opts.sort)
            query.sort = opts.sort
    }
    query.where = args;
    var data = {}
    return query.model.findByIdAsync(args.id).then((result) => { return result; }).catch((err) => { logger.log('error', err); });
};

var queryBuilder = (op, model, args, opts, doc) => {

    switch (op) {

        case 'FIND':
            return buildFind(model, args, opts, doc)

        case 'FIND_ONE':
            return buildFindOne(model, args, opts, doc)
        default:
            break;
    }
    return {};
};


module.exports = queryBuilder;