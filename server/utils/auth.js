//Here, we import "GraphQLError" from "graphql", which will be used to handle "Authentication" "Error"s (defined below). We also import the built-in "jwt" (stands for "JSON Web Tokens") package from "jsonwebtoken", to handle the creation and "authentication" or JSON Web Tokens.
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

//For this app, we have used a simple string for the "secret", which is used to assist in verification of the "jwt"'s "authentication". Whatever the key is, it is important to keep this information from being exposed during transactions.

//We also declare that the "Token" will "expir"e "2h"ours after it is issued.
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

//Here, we provide "boilerplate" "auth"entication code blocks, common to this sort of app. Witout these basic blocks, the app could not authenticate "user"s upon log-in.
module.exports = {
  
  authMiddleware: function ({ req, res, next }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token.' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token.');
      return res.status(400).json({ message: 'invalid token.' });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
