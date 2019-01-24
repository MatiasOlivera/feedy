import { MutationResolvers } from '../../../resolvers.types';

const restoreOrganization: MutationResolvers.RestoreOrganizationResolver = async (
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
      data: { deletedAt: null },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The organization was restored succesfully'
      },
      organization
    };
  } catch (err) {
    throw err;
  }
};

export default restoreOrganization;
