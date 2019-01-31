import BaseValidator from '../base.validator';
import existsRule from '../custom_rules/exists.rule';
import { CustomRule } from '../rules.types';

class IssueValidator<T> extends BaseValidator<T> {
  constructor(customRules: Array<CustomRule> = [existsRule]) {
    super();
    this.registerCustomRules(customRules);
  }

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
