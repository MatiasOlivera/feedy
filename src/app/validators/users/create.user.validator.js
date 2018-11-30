const UserValidator = require('./user.validator');

class CreateUserValidator extends UserValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    const rules = super.rules();

    rules.firstName = ['required', ...rules.firstName];
    rules.lastName = ['required', ...rules.lastName];
    rules.gender = ['required', ...rules.gender];
    rules.username = ['required', ...rules.username, 'unique:users'];
    rules.password = ['required', 'string', 'between:8,25'];
    rules.passwordConfirmation = ['same:password'];
    rules.email = ['required', ...rules.email, 'unique:users'];

    return rules;
  }
}

module.exports = CreateUserValidator;
