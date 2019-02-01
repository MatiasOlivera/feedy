import { MutationResolvers } from '../../../graphql/resolvers.types';
import OrganizationValidator from './org.validator';

class UpdateOrganizationValidator extends OrganizationValidator<
  UpdateOrganizationInput
> {
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      name: [
        'required',
        ...rules.name,
        `unique:organizations,name,${this.value.id}`
      ]
    };
  }
}

type UpdateOrganizationInput = MutationResolvers.UpdateOrganizationInput & {
  id: string;
};

export default UpdateOrganizationValidator;
