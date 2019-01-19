import BaseValidator from '../base.validator';

class IssueValidator<T> extends BaseValidator<T> {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      title: ['string', 'between:3,50'],
      body: ['string', 'max:255'],
      userId: ['alpha_num', 'exists:user,id'],
      productId: ['alpha_num', 'exists:product,id']
    };
  }
}

export default IssueValidator;
