import CommentValidator from './comment.validator';

class CreateCommentValidator extends CommentValidator {
  rules() {
    return {
      ...super.rules(),
      parentId: ['integer', 'exists:comments,id'],
      userId: ['required', 'integer', 'exists:users,id'],
      issueId: ['required', 'integer', 'exists:issues,id']
    };
  }
}

export default CreateCommentValidator;
