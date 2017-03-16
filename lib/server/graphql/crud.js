var _ = require('lodash');
var logger = require('../../../logger')

var buildFind = (model, args, opts, doc) => {
    if (args.id) {
        args._id = args.id;
        delete args.id;

    }
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
    if(opts !== null){
        if(opts.sort)
        query.sort = opts.sort
    }
    query.where = args;
    var data = {}
    return query.model.find(query.where).sort(query.sort).execAsync().then((results) => { return results; }).catch((err) => { logger.log('error',err); });
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
    if(opts !== null){
        if(opts.sort)
        query.sort = opts.sort
    }
    query.where = args;
    var data = {}
    return query.model.findByIdAsync(args.id).then((result) => { return result; }).catch((err) => { logger.log('error',err); });
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