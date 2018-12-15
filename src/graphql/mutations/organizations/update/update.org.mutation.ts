import { UpdateOrganizationValidator } from '../../../../app/validators';
import { Organization } from '../../../../models';
import { IOperation } from 'graphql-schema';

const updateOrganization = async (root: undefined, args: any): Promise<any> => {
  let org;
  try {
    org = await Organization.query().findById(args.id);

    if (!org) {
      const operation: IOperation = {
        status: false,
        message: 'The organization does not exists'
      };

      return {
        operation,
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
    const operation: IOperation = {
      status: false,
      message: 'There are validation errors'
    };

    return {
      operation,
      organization: null,
      errors: err
    };
  }

  try {
    const updatedOrg = await org.$query().patchAndFetch(args.org);

    const operation: IOperation = {
      status: true,
      message: 'The organization was updated succesfully'
    };

    return {
      operation,
      organization: updatedOrg,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { updateOrganization } };
