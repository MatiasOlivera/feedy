import UserValidator from './user.validator';

class UpdateUserValidator extends UserValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    const rules = super.rules();
    const { id } = this.data;

    return {
      ...rules,
      username: [...rules.username, `unique:users,username,${id}`],
      email: [...rules.email, `unique:users,email,${id}`]
    };
  }
}

export default UpdateUserValidator;