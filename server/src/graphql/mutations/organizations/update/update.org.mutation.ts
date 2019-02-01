import { MutationResolvers } from '../../../resolvers.types';
import { UpdateOrganizationValidator } from '../../../validators';

const updateOrganization: MutationResolvers.UpdateOrganizationResolver = async (
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
        organization: null,
        errors: null
      };
    }
  } catch (err) {
    throw err;
  }

  try {
    const validator = new UpdateOrganizationValidator();
    await validator.validate({ id: args.id, ...args.org });
  } catch (err) {
    return {
      operation: {
        status: false,
        message: 'There are validation errors'
      },
      organization: null,
      errors: err
    };
  }

  try {
    const updatedOrg = await ctx.db.updateOrganization({
      data: { name: args.org.name, bio: args.org.bio },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The organization was updated succesfully'
      },
      organization: updatedOrg,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default updateOrganization;
