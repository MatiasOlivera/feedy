import { QueryResolvers } from '../../resolvers.types';

const organization: QueryResolvers.OrganizationResolver = (
  parent,
  args,
  ctx
) => {
  return ctx.db.organization({ id: args.id });
};

const organizations: QueryResolvers.OrganizationsResolver = (
  parent,
  args,
  ctx
) => {
  return ctx.db.organizations();
};

export default { Query: { organization, organizations } };
