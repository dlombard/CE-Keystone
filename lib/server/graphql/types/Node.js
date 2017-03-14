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

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);

        var args = { id }

        console.log(`TYPE: ${type}`)
        switch (type) {
            case 'Song':
                return db('FIND_ONE', keystone.list('Song').model, args, null)
            default:
                return null
        }
    },
    (obj) => {
        console.log(`OBJ: ${obj}`)
        return {};
    }
);

module.exports = { nodeInterface, nodeField }
