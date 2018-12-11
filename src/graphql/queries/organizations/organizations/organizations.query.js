const { Organization } = require('../../../../models');
const paginate = require('../../_utils/pagination');

const organizationsQuery = async (root, args) => {
  try {
    return await paginate(Organization, args);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    organizations: organizationsQuery
  }
};
