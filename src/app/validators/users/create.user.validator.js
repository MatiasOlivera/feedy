const BaseValidator = require('../base.validator');

class CreateUserValidator extends BaseValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      firstName: 'required|string|between:3,50',
      lastName: 'required|string|between:3,50',
      gender: 'required|in:Female,Male,Other',
      username: 'required|alpha_dash|between:3,50|unique:users',
      password: 'required|string|between:8,25',
      passwordConfirmation: 'same:password',
      email: 'required|email|between:5,50|unique:users',
      bio: 'string|max:255'
    };
  }
}

module.exports = CreateUserValidator;
