import { UserResolvers } from '../../resolvers.types';

const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  fullName: (parent, args, ctx) => {
    return `${parent.firstName} ${parent.lastName}`;
  },

  products: (parent, args, ctx) => {
    return ctx.db.user({ id: parent.id }).products();
  },

  organizations: (parent, args, ctx) => {
    return ctx.db.user({ id: parent.id }).organizations();
  },

  issues: (parent, args, ctx) => {
    return ctx.db.user({ id: parent.id }).issues();
  },

  comments: (parent, args, ctx) => {
    return ctx.db.user({ id: parent.id }).comments();
  }
};

export default User;
