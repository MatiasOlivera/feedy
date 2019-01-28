import { MutationResolvers } from '../../../graphql/resolvers.types';
import CommentValidator from './comment.validator';

class UpdateCommentValidator extends CommentValidator<
  MutationResolvers.UpdateCommentInput
> {
  rules() {
    return super.rules();
  }
}

export default UpdateCommentValidator;
