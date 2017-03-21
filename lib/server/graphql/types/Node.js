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
var db = require('../crud')
var SongType = require('./Song')

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);

        switch (type) {
            case 'Song':
                return db('FIND_ONE', keystone.list('Song').model, { id }, null)
            default:
                return null
        }
    },
    (obj) => {
        return 'Song'

    }
);

module.exports = { nodeInterface, nodeField }
