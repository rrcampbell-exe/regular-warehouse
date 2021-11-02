const { User, Item } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
    
        return userData;
      }
    
      throw new AuthenticationError('Please log in first.');
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
    },
    // get user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
    },
    // get all items
    items: async () => {
      console.log("getting items is triggered")
      return Item.find();
    },
    // get single item by part_number
    item: async (parent, { part_number }) => {
      return Item.findOne({ part_number });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Those credentials are incorrect.");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addItem: async (parent, args) => {
      const item = await Item.create(args);

      return item;
    },
    updateItem: async(parent, args) => {

      const item = await Item.updateOne({ _id: args._id }, args)

      return item;
    },
    deleteItem: async(parent, part_number) => {
      const item = await Item.deleteOne(part_number)

      return item;
    }
  },
};

module.exports = resolvers;
