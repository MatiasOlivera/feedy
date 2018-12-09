const { Issue } = require('../../../../models');

const restoreIssue = async (root, args) => {
  try {
    const issue = await Issue.query().findById(args.id);

    if (!issue)
      return {
        operation: {
          status: false,
          message: 'The issue does not exists'
        },
        issue: null
      };
  } catch (err) {
    throw err;
  }

  try {
    await Issue.query()
      .where('id', args.id)
      .restore();

    const issue = await Issue.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The issue was restored succesfully'
      },
      issue
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { Mutation: { restoreIssue } };
