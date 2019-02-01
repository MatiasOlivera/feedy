import { MutationResolvers } from '../../../graphql/resolvers.types';
import uniqueRule from '../custom_rules/unique.rule';
import { CustomRule } from '../rules.types';
import UserValidator from './user.validator';

class CreateUserValidator extends UserValidator<
  MutationResolvers.CreateUserInput
> {
  constructor(customRules: Array<CustomRule> = [uniqueRule]) {
    super();
    this.registerCustomRules(customRules);
  }

  // eslint-disable-next-line class-methods-use-this
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      firstName: ['required', ...rules.firstName],
      lastName: ['required', ...rules.lastName],
      gender: ['required', ...rules.gender],
      username: ['required', ...rules.username, 'unique:users'],
      password: ['required', 'string', 'between:8,25'],
      passwordConfirmation: ['same:password'],
      email: ['required', ...rules.email, 'unique:users']
    };
  }
}

export default CreateUserValidator;
