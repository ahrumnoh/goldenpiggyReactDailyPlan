const { AuthenticationError } = require('apollo-server-express');
const { User, News } = require('../models'); //* News
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('newss'); //* news
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('newss'); //*news
    },
    newss: async (parent, { username }) => {
      const params = username ? { username } : {};
      return News.find(params).sort({ createdAt: -1 }); //*News
    },
    news: async (parent, { newsId }) => { //*newsId
      return News.findOne({ _id: newsId }); //*News
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('newss'); //*news
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addNews: async (parent, { newsText }, context) => { //*addNews / newsText
      if (context.user) {
        const news = await News.create({ //*news /News
          newsText,  //* newsText
          newsAuthor: context.user.username, //*newsAuthor
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { newss: news._id } }  //* news: news
        );

        return news; //* news
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { newsId, commentText }, context) => {
      if (context.user) {
        return News.findOneAndUpdate( //*News
          { _id: newsId }, //newsId
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeNews: async (parent, { newsId }, context) => {  //*newsId
      if (context.user) {
        const news = await News.findOneAndDelete({  //* news / News
          _id: newsId, //* newsId
          newsAuthor: context.user.username, //*newsAuthor
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { newss: news._id } } //*news: news
        );

        return news; //*news
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { newsId, commentId }, context) => { //*newsId
      if (context.user) {
        return News.findOneAndUpdate( //*News
          { _id: newsId }, //*newsId
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
