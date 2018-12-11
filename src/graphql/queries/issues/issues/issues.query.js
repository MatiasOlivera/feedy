const { Issue } = require('../../../../models');
const paginate = require('../../_utils/pagination');

const issuesQuery = async (root, args) => {
  try {
    return await paginate(Issue, args);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    issues: issuesQuery
  }
};
