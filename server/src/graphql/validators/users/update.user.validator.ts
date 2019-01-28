import { MutationResolvers } from '../../../graphql/resolvers.types';
import UserValidator from './user.validator';

interface UpdateUserArgs {
  id: string;
}

class UpdateUserValidator extends UserValidator<
  MutationResolvers.UpdateUserInput,
  UpdateUserArgs
> {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    const rules = super.rules();
    const { id } = this.args;

    return {
      ...rules,
      username: [...rules.username, `unique:users,username,${id}`],
      email: [...rules.email, `unique:users,email,${id}`]
    };
  }
}

export default UpdateUserValidator;
