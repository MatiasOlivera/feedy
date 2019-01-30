import { MutationResolvers } from '../../../graphql/resolvers.types';
import existsRule from '../custom_rules/exists.rule';
import { CustomRule } from '../rules.types';
import CommentValidator from './comment.validator';

class CreateCommentValidator extends CommentValidator<
  MutationResolvers.CreateCommentInput
> {
  constructor(customRules: Array<CustomRule> = [existsRule]) {
    super();
    this.registerCustomRules(customRules);
  }

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
