const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models/');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books');
        },

        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params);
        },
        book: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params);
        },

        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({_id: context.user._id});
                return user;
            }

            throw new AuthenticationError('User not found');
        },
    },

    Mutation: {
        getSingleUser: async (parent) => {

        },

        // create new user
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        // login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },

        // save a book
        saveBook: async (parent) => {

        },

        // delete a book
        deleteBook: async (parent, { bookId }) => {
            if (context.user) {
                const book = await Book.findOneAndDelete({ _id: bookId });


                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book._id }}
                );

                return book;
            }
            throw new AuthenticationError('You need to be logged in to delete a book');
        },
    }
}


module.exports = resolvers;
