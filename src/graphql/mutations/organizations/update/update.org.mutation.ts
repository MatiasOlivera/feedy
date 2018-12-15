import { UpdateOrganizationValidator } from '../../../../app/validators';
import { Organization } from '../../../../models';
import { IOrganizationPayload } from 'graphql-schema';

const updateOrganization = async (
  root: undefined,
  args: any
): Promise<IOrganizationPayload> => {
  let org;
  try {
    org = await Organization.query().findById(args.id);

    if (!org) {
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
    const inputOrg = { id: args.id, ...args.org };
    const validator = new UpdateOrganizationValidator(inputOrg);
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
    const updatedOrg = await org.$query().patchAndFetch(args.org);

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

export default { Mutation: { updateOrganization } };
