var {
    buildSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType,
    Graphql
} = require('graphql');

var {
  connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    connectionFromPromisedArray,
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    toGlobalId,
} = require('graphql-relay');

var keystone = require('keystone')
var SongType = require('./Song')
var db = require('../crud')

var Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        songs: {
            type: songConnection,
            args: {
                ...connectionArgs,
                book: { type: GraphQLString },
                language: { type: GraphQLString },
                minTotalViews: { type: GraphQLInt },
                sortField: { type: GraphQLString },
            },
            resolve: (viewer, args) => {
                return connectionFromPromisedArray(
                    db('FIND', keystone.list('Song').model, args, null).then((collection) => { return collection }),
                    args
                )
            },

            //resolve: (root, args) => db('FIND', keystone.list('Song').model, { 'book.abbrv': args.book }, null).then((collection) => { return collection; }),
        },

    }),
})



const {
  connectionType: songConnection,
} = connectionDefinitions({
        name: 'Song',
        nodeType: SongType,
    });

module.exports = Viewer