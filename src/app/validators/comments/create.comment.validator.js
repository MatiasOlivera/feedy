const CommentValidator = require('./comment.validator');

class CreateCommentValidator extends CommentValidator {
  rules() {
    const rules = super.rules();

    rules.body = ['required', ...rules.body];
    rules.userId = ['required', ...rules.userId];
    rules.issueId = ['required', ...rules.issueId];

    return rules;
  }
}

module.exports = CreateCommentValidator;
