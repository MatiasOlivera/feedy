const CommentValidator = require('./comment.validator');

class UpdateCommentValidator extends CommentValidator {
  rules() {
    return super.rules();
  }
}

module.exports = UpdateCommentValidator;
