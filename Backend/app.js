const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const { connectToDatabase } = require("./db/db");
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDef");
const resolvers = require("./resolvers");

const app = express();
const port = 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDatabase();
});
