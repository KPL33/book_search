const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args) => {
      return User.find().populate('books');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
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
  };