import { MutationResolvers } from '../../../graphql/resolvers.types';
import OrganizationValidator from './org.validator';

class CreateOrganizationValidator extends OrganizationValidator<
  MutationResolvers.CreateOrganizationInput
> {
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      name: ['required', ...rules.name, 'unique:organizations,name']
    };
  }
}

export default CreateOrganizationValidator;
