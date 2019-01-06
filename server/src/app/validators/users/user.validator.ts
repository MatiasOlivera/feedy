import BaseValidator from '../base.validator';

class UserValidator<T> extends BaseValidator<T> {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      firstName: ['string', 'between:3,50'],
      lastName: ['string', 'between:3,50'],
      gender: ['in:Female,Male,Other'],
      username: ['alpha_dash', 'between:3,50'],
      email: ['email', 'between:5,50'],
      bio: ['string', 'max:255']
    };
  }
}

export default UserValidator;
