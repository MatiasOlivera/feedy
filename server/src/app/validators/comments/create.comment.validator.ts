import { MutationResolvers } from '../../../graphql/resolvers.types';
import CommentValidator from './comment.validator';

class CreateCommentValidator extends CommentValidator<
  MutationResolvers.CreateCommentInput
> {
  rules() {
    return {
      ...super.rules(),
      parentId: ['alpha_num', 'exists:comment,id'],
      userId: ['required', 'alpha_num', 'exists:user,id'],
      issueId: ['required', 'alpha_num', 'exists:issue,id']
    };
  }
}

export default CreateCommentValidator;
