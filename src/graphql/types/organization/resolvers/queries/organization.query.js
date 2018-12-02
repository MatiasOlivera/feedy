const { Organization } = require('../../../../../models');

const organizationQuery = async (root, args) => {
  try {
    const { id } = args;
    return await Organization.query().findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    organization: organizationQuery
  }
};
