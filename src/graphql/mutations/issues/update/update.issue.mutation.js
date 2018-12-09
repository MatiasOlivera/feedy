const { UpdateIssueValidator } = require('../../../../app/validators');
const { Issue } = require('../../../../models');

const updateIssue = async (root, args) => {
  let issue;
  try {
    issue = await Issue.query().findById(args.id);

    if (!issue)
      return {
        operation: {
          status: false,
          message: 'The issue does not exists'
        },
        issue: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const inputIssue = { id: args.id, ...args.issue };
    const validator = new UpdateIssueValidator(inputIssue);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      issue: null,
      errors: err
    };
  }

  try {
    const updatedIssue = await issue.$query().patchAndFetch(args.issue);

    return {
      operation: {
        status: true,
        message: 'The issue was updated succesfully'
      },
      issue: updatedIssue,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { Mutation: { updateIssue } };
