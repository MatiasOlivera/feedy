import { MutationResolvers } from '../../../graphql/resolvers.types';
import OrganizationValidator from './org.validator';

class UpdateOrganizationValidator extends OrganizationValidator<
  MutationResolvers.UpdateOrganizationInput
> {
  rules() {
    const rules = super.rules();
    const { id } = this.data;

    return {
      ...rules,
      name: ['required', ...rules.name, `unique:organizations,name,${id}`]
    };
  }
}

export default UpdateOrganizationValidator;
