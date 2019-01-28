import BaseValidator from '../base.validator';

class ProductValidator<T> extends BaseValidator<T> {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      name: ['string', 'between:3,50'],
      description: ['string', 'max:100'],
      ownerId: ['alpha_num']
    };
  }
}

export default ProductValidator;
