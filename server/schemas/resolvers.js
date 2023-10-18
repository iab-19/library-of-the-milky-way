const { signToken } = require('../utils/auth');
const { User } = require('../models/');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({_id: context.user._id});
                return user;
            }

            throw new AuthenticationError('User not found');
        }
    }
}


module.exports = resolvers;
