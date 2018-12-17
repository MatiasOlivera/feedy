import BaseValidator from '../base.validator';

class CommentValidator extends BaseValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      body: ['required', 'string', 'between:3,255']
    };
  }
}

export default CommentValidator;
