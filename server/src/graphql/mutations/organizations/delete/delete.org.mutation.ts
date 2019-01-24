import { MutationResolvers } from '../../../resolvers.types';

const deleteOrganization: MutationResolvers.DeleteOrganizationResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const orgExists = await ctx.db.$exists.organization({ id: args.id });

    if (!orgExists) {
      return {
        operation: {
          status: false,
          message: 'The organization does not exists'
        },
        organization: null
      };
    }
  } catch (err) {
    throw err;
  }

  try {
    const organization = await ctx.db.updateOrganization({
      data: { deletedAt: new Date() },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The organization was deleted succesfully'
      },
      organization
    };
  } catch (err) {
    throw err;
  }
};

export default deleteOrganization;
