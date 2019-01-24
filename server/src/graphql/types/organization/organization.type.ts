import { OrganizationResolvers } from '../../resolvers.types';

export const Organization: OrganizationResolvers.Type = {
  ...OrganizationResolvers.defaultResolvers,

  products: (parent, args, ctx) => {
    return ctx.db.organization({ id: parent.id }).products();
  },

  members: (parent, args, ctx) => {
    return ctx.db.organization({ id: parent.id }).members();
  }
};

export default Organization;
