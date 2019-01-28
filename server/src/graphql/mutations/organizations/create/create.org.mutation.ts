import { MutationResolvers } from '../../../resolvers.types';
import { CreateOrganizationValidator } from '../../../validators';

const createOrganization: MutationResolvers.CreateOrganizationResolver = async (
  parent,
  args,
  ctx
) => {
  const { org } = args;

  try {
    const validator = new CreateOrganizationValidator();
    await validator.validate(org);
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
    const newOrg = await ctx.db.createOrganization({
      name: org.name,
      bio: org.bio
    });

    return {
      operation: {
        status: true,
        message: 'The organization was created succesfully'
      },
      organization: newOrg,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default createOrganization;
