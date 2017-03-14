var _ = require('lodash');


var buildFind = (args, query) => {
    if (args.id) {
        args._id = args.id;
        delete args.id;

    }
    query.where = args;
    var data = {}
  
    return query.model.findAsync(query.where).then((results) => { return results; }).catch((err) => { console.log(err); });
};

var queryBuilder = (op, model, args, doc) => {
    var query = {
        op,
        model,
        where: {

        },
        projection: {

        },
        skip: {

        },
        limit: {

        },
        doc
    };

    switch (op) {
        case 'FIND':

            return buildFind(args, query)
            break;
        case 'FIND_ONE':
            model.findById(args).exec(function (err, item) {

                if (err) return err;
                if (!item) return null;

                return item

            });
            break;
        default:
            break;
    }

    return {};
};


module.exports = queryBuilder;