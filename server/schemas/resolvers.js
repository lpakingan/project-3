const { User, Event, UserEvent } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    events: async () => {
      try {
        const events = await Event.find({});
        return events;
      } catch (err) {
        throw new (err, "error in events query")();
      }
    },

    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (err) {
        throw new (err, "error in users query")();
      }
    },

    all_user_events: async () => {
      try {
        return await UserEvent.find({}).populate("event").populate("user");
      } catch (err) {
        throw new (err, "error in all_user_events query")();
      }
    },

    user: async (parent, { username }) => {
      try {
        return await User.findOne({ username: username });
      } catch (err) {
        throw new (err, "error in user query")();
      }
    },

    event: async (parent, { title }) => {
      try {
        return await Event.findOne({ title: title });
      } catch (err) {
        throw new (err, "error in event query")();
      }
    },

    user_events: async (parent, { username }) => {
      try {
        const user = await User.findOne({ username: username });

        if (!user) {
          return null;
        }

        return await UserEvent.findOne({ user: user._id })
          .populate("event")
          .populate("user");
      } catch (err) {
        throw new (err, "error in user_events query")();
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // uncomment out when login is added
      //   const token = signToken(user);

      //   return { token, user };
      return { user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    createEvent: async (
      parent,
      { title, date, venue, location, performer, image, link, eventId }
    ) => {
      const newEvent = await Event.create({
        title,
        date,
        venue,
        location,
        performer,
        image,
        link,
        eventId,
      });
      try {
        const event = await newEvent.save();
        return event;
      } catch (err) {
        throw new (err, "error in createEvent mutation")();
      }
    },
  },
};
module.exports = resolvers;
