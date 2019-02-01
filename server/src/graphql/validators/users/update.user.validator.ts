import { MutationResolvers } from '../../../graphql/resolvers.types';
import uniqueRule from '../custom_rules/unique.rule';
import { CustomRule } from '../rules.types';
import UserValidator from './user.validator';

class UpdateUserValidator extends UserValidator<UpdateUserInput> {
  constructor(customRules: Array<CustomRule> = [uniqueRule]) {
    super();
    this.registerCustomRules(customRules);
  }

  // eslint-disable-next-line class-methods-use-this
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      username: [...rules.username, `unique:users,username,${this.value.id}`],
      email: [...rules.email, `unique:users,email,${this.value.id}`]
    };
  }
}

type UpdateUserInput = MutationResolvers.UpdateUserInput & { id: string };

export default UpdateUserValidator;
