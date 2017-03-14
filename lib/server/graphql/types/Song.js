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


var { nodeInterface, nodeField } = require('./Node')

var SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: globalIdField('Song'),
        title: { type: GraphQLString, },
        num: { type: GraphQLInt },
        book: {
            type: new GraphQLObjectType({
                name: 'Book',
                fields: () => ({
                    name: { type: GraphQLString },
                    abbrv: { type: GraphQLString },
                    languages: { type: GraphQLString, }
                })
            })

        },
        lyrics: { type: GraphQLString },
        lyrics_Markdown: {
            type: new GraphQLObjectType({
                name: 'Markdown',
                fields: () => ({
                    md: { type: GraphQLString },
                    html: { type: GraphQLString }
                })
            })
        },
        lyrics_Html: { type: GraphQLString, },
        tags: { type: GraphQLString, },
        videos: { type: GraphQLString, },
        references: {
            type: new GraphQLObjectType({
                name: 'References',
                fields: () => ({
                    author: { type: GraphQLString },
                    book: { type: GraphQLString },
                    year: { type: GraphQLString },
                })

            })
        },
        partitions: { type: GraphQLString, },
        language: { type: GraphQLString },
        songId: { type: GraphQLString, },
    }),
    interfaces: () => [nodeInterface],
})

module.exports = SongType