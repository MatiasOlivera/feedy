const IssueValidator = require('./issue.validator');

class UpdateIssueValidator extends IssueValidator {
  rules() {
    return super.rules();
  }
}

module.exports = UpdateIssueValidator;
