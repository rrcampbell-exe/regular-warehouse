// import gql function (tagged template)
const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
  }

  type Item {
    _id: ID
    name: String
    part_number: Int
    quantity: Int
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addItem(name: String!, part_number: Int! quantity: Int!): Item
    updateItem(name: String, part_number: Int, quantity: Int): Item
    deleteItem(part_number: Int!): Item
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }
`;

// export typeDefs
module.exports = typeDefs;
