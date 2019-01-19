import { CreateOrganizationValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const createOrganization: MutationResolvers.CreateOrganizationResolver = async (
  parent,
  args,
  ctx
) => {
  const { org } = args;

  try {
    const validator = new CreateOrganizationValidator(org);
    await validator.validate();
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

export default { Mutation: { createOrganization } };
