const BaseValidator = require('../base.validator');

class CommentValidator extends BaseValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      body: ['string', 'between:3,255'],
      parentId: ['integer', 'exists:comments,id'],
      userId: ['integer', 'exists:users,id'],
      issueId: ['integer', 'exists:issues,id']
    };
  }
}

module.exports = CommentValidator;
