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
    part_number: String
    quantity: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    items: [Item]
    item(part_number: String!): Item
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addItem(name: String!, part_number: String! quantity: Int!): Item
    updateItem(_id: ID!, name: String!, part_number: String!, quantity: Int!): Item
    deleteItem(part_number: String!): Item
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// export typeDefs
module.exports = typeDefs;
