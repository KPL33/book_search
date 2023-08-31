
//Here, we import the "User" "model", for reference by our "resolver". We also "tree-shake" and import "signToken" and "AuthenticationError" from our "auth" file, which will be used to generate authentication tokens and handle authentication errors.
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

//Our "resolvers" object holds our "Query" and "Mutation" functions.
const resolvers = {
  //"Query" works similar to a "GET" route, returning "Data" on the "user" that is currently logged in. That "user" is defined as "me". Of the 3 parameters that the "async" receives, "parent" and "args" are not used, but "context" will hold the "user"'s "Authentication".
  Query: {
    me: async (parent, args, context) => {
      //If there is a "user" in the "context", we fetch the "userData", using the "findOne" method on the "model" called "User" model's. The method searches for a "user" with the "_id" matching the "_id" of the authenticated "user" from the "context". '.select("-__v -password")' specifies that  the "return"ed data should exclude the "password" field, (because it contains sensitive information that we don't want to expose).
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      };
      //If there is no "user" in the "return"ed "context", this error will appear.
      throw new AuthenticationError("Please log in.");
    }
  },
  
//In a way, "Mutation"s are GraphQL's versions of "POST" and "PUT Routes". Here, our "Mutation" holds many useful functions. The first allows new "addUser"s to be created.
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    //Here, our "login" verication compares "user" inputs to "user" and "password" info that may or may not already exist in the app's database. "if" the credentials are correct, a "token" is "return"ed, along with the "user" to which that "token" is assigned, allowing the "user" to log-in. If not, an error is "throw"n.
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError("Login information is incorrect. Please try again.");
      };
      
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError("Login information is incorrect. Please try again.");
      };

      const token = signToken(user);
      
      return { token, user };
    },

    //Here, we give our app the means to "save" a "Book", once the "user" clicks the button to do so on the app page. Again, the required "parent" parameter is not being used, but the chosen "book" is extracted (via "destructuring") and added to the "context" of the "user", "if" tjat "User" is found, when the the function attempts toe "add" the "book" "To" the "Set" "savedBooks". Including "new: true" ensures that subsequent searches for the "updatedUser" will include the books that have been added.
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );
        
        return updatedUser;
      };

      //If no "user" is logged-in, this message will appaer.
      throw new AuthenticationError("Please log-in to continue.");
    },

    //Similarly, should a "user" choose to "remove" a "Book", we provide them with that functionality here. The "bookId" entered by the "user" will be located within that user's "context" and "pull"ed (removed) from the "savebBooks" list for that user.
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      };
    }
  }
};

module.exports = resolvers;