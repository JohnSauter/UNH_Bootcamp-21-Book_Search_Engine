/* resolver.js */

const { User } = require("../models");

const resolvers = {
  Query: {
    getSingleUser: async (parent, args) => {
      const foundUser = await User.findOnebyId(args.user._id);
      const token = signToken(foundUser);
      return { user: foundUser, token };
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const username = args.username;
      const email = args.email;
      const password = args.password;
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { user: newUser, token };
    },
    loginUser: async (parent, args) => {
      const email = args.email;
      const password = args.password;
      const user = await User.findOne({ email });
      const token = signToken(user);
      return { user, token };
    },
    saveBook: async (parent, args) => {
      const authors = args.authors;
      const description = args.description;
      const title = args.title;
      const bookId = args.bookId;
      const image = args.image;
      const link = args.link;
      const newBook = { authors, description, title, bookId, image, link };
      const updatedUser = await User.findOneAndUpdate(
        { _id: args.user._id },
        { $addToSet: { savedBooks: newBook } },
        { new: true, runValidators: true }
      );
      const token = signToken(updatedUser);
      return { user: updatedUser, token };
    },
    deleteBook: async (parent, args) => {
      const bookId = args.bookId;
      const updatedUser = await User.findOneAndUpdate(
        { _id: args.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      const token = signToken(updatedUser);
      return { user: updatedUser, token };
    },
  },
};

module.exports = resolvers;
