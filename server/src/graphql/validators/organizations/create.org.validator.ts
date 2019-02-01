import { MutationResolvers } from '../../../graphql/resolvers.types';
import uniqueRule from '../custom_rules/unique.rule';
import { CustomRule } from '../rules.types';
import OrganizationValidator from './org.validator';

class CreateOrganizationValidator extends OrganizationValidator<
  MutationResolvers.CreateOrganizationInput
> {
  constructor(customRules: Array<CustomRule> = [uniqueRule]) {
    super();
    this.registerCustomRules(customRules);
  }

  rules() {
    const rules = super.rules();

    return {
      ...rules,
      name: ['required', ...rules.name, 'unique:organizations,name']
    };
  }
}

export default CreateOrganizationValidator;
