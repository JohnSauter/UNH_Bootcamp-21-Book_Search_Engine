/* resolver.js */
const { AuthenticationError } = require("apollo-server-express");

const { signToken } = require("../utils/auth");
const { User } = require("../models");

const resolvers = {
  Query: {
    getSingleUser: async (parent, args, context) => {
      if (context.user) {
        const foundUser = await User.findById(context.user._id);
        return foundUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const username = args.username;
      const email = args.email;
      const password = args.password;
      let olduser = await User.findOne({username: username});
      if (olduser) {
        throw new AuthenticationError("User Name already in use.");
      }
      olduser = await User.findOne({email: email});
      if (olduser) {
        throw new AuthenticationError("Email already in use.");
      }
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);
      return { user: newUser, token };
    },

    loginUser: async (parent, args) => {
      const email = args.email;
      const password = args.password;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address.");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials.");
      }

      const token = signToken(user);
      return { user, token };
    },

    addBook: async (parent, args, context) => {
      if (context.user) {
        const authors = args.authors;
        const description = args.description;
        const title = args.title;
        const bookId = args.bookId;
        const image = args.image;
        const link = args.link;
        const unique_id = args.unique_id;
        const previewLink = args.previewLink;
        const newBook = {
          authors,
          description,
          title,
          bookId,
          image,
          link,
          unique_id,
          previewLink,
        };
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: newBook } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in for save.");
    },

    deleteBook: async (parent, args, context) => {
      if (context.user) {
        const unique_id = args.unique_id;
        const user_id = context.user._id;
        const updatedUser = await User.findOneAndUpdate(
          { _id: user_id },
          { $pull: { savedBooks: { unique_id } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in for delete.");
    },
  },
};

module.exports = resolvers;
