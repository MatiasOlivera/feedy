import { MutationResolvers } from '../../../graphql/resolvers.types';
import OrganizationValidator from './org.validator';

interface UpdateOrganizationArgs {
  id: string;
}

class UpdateOrganizationValidator extends OrganizationValidator<
  MutationResolvers.UpdateOrganizationInput,
  UpdateOrganizationArgs
> {
  rules() {
    const rules = super.rules();
    const { id } = this.args;

    return {
      ...rules,
      name: ['required', ...rules.name, `unique:organizations,name,${id}`]
    };
  }
}

export default UpdateOrganizationValidator;
