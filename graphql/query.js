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
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    toGlobalId,
} = require('graphql-relay');

var keystone = require('keystone')
var SongType = require('./types/Song')
var { nodeInterface, nodeField } = require('./types/Node')
var db = require('./crud')

var Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        songs: {
            type: new GraphQLList(SongType),
            args: {
                book: { type: GraphQLString }
            },
            resolve: (root, args) => db('FIND', keystone.list('Song').model, { 'book.abbrv': args.book }, null).then((collection) => { return collection; }),
        },

    }),
})

var QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: Viewer,
            resolve: (root, args) => { return {} },
        },
    })
})

module.exports = QueryType
