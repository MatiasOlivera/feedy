import IssueValidator from './issue.validator';

class CreateIssueValidator extends IssueValidator {
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      title: ['required', ...rules.title],
      body: ['required', ...rules.body],
      userId: ['required', ...rules.userId],
      productId: ['required', ...rules.productId]
    };
  }
}

export default CreateIssueValidator;
