const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async () => {
        return await User.find();
      },
    },

    Me {

    },

    addUser {

    },

    saveBook {

    },

    removeBook {
        
    },

    loginUser {
        
    },
