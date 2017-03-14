
var graphqlHTTP = require('express-graphql');
var QueryType = require('./query');
var { GraphQLSchema } = require('graphql');

module.exports = function initGraphQL() {
    var schema = new GraphQLSchema({
        query: QueryType,
      //  mutation: MutationType,
    })
    
    return graphqlHTTP({
        schema: schema,
        graphiql: true,
    });
}