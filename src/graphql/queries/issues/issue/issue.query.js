const { Issue } = require('../../../../models');

const issueQuery = async (root, args) => {
  try {
    const { id } = args;
    return await Issue.query().findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    issue: issueQuery
  }
};
