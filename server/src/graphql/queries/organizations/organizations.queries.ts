import { OrganizationWhereInput } from '../../../database/prisma-client';
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
  const { search } = args;

  const where: OrganizationWhereInput = search ? { name_contains: search } : {};

  return ctx.db.organizations({ where });
};

export default { Query: { organization, organizations } };
