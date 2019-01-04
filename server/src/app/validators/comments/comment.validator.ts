import BaseValidator from '../base.validator';

class CommentValidator<T> extends BaseValidator<T> {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      body: ['required', 'string', 'between:3,255']
    };
  }
}

export default CommentValidator;
