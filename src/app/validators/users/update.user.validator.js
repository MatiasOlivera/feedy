const UserValidator = require('./user.validator');

class UpdateUserValidator extends UserValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    const rules = super.rules();
    const { id } = this.data;

    rules.username = [...rules.username, `unique:users,username,${id}`];
    rules.email = [...rules.email, `unique:users,email,${id}`];

    return rules;
  }
}

module.exports = UpdateUserValidator;
