import { MutationResolvers } from '../../../graphql/resolvers.types';
import IssueValidator from './issue.validator';

class UpdateIssueValidator extends IssueValidator<
  MutationResolvers.UpdateIssueInput
> {
  rules() {
    return super.rules();
  }
}

export default UpdateIssueValidator;
