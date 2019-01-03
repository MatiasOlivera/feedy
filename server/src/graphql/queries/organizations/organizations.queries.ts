import { QueryResolvers } from '../../resolvers.types';

const Query: QueryResolvers.Type = {
  organization: (parent, args, ctx) => {
    return ctx.db.organization({ id: args.id });
  },

  organizations: (parent, args, ctx) => {
    return ctx.db.organizations();
  }
};

export default { Query };
