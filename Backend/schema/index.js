const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const hotelSchema = require("./hotel.schema");
const roomSchema = require("./room.schema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...hotelSchema.query.fields,
    ...roomSchema.query.fields,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...hotelSchema.mutation.fields,
    ...roomSchema.mutation.fields,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
