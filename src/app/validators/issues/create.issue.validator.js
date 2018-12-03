const IssueValidator = require('./issue.validator');

class CreateIssueValidator extends IssueValidator {
  rules() {
    const rules = super.rules();

    rules.title = ['required', ...rules.title];
    rules.body = ['required', ...rules.body];
    rules.userId = ['required', ...rules.userId];
    rules.productId = ['required', ...rules.productId];

    return rules;
  }
}

module.exports = CreateIssueValidator;
