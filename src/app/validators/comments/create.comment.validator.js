const CommentValidator = require('./comment.validator');

class CreateCommentValidator extends CommentValidator {
  rules() {
    const rules = super.rules();

    rules.parentId = ['integer', 'exists:comments,id'];
    rules.userId = ['required', 'integer', 'exists:users,id'];
    rules.issueId = ['required', 'integer', 'exists:issues,id'];

    return rules;
  }
}

module.exports = CreateCommentValidator;
