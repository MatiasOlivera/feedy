import BaseValidator from '../base.validator';

class OrganizationValidator<T, U = undefined> extends BaseValidator<T, U> {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      name: ['string', 'between:3,50'],
      bio: ['string', 'max:255']
    };
  }
}

export default OrganizationValidator;
