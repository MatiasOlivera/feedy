const { User } = require('../../../../models');

const userQuery = async (root, args) => {
  try {
    const { id } = args;
    return await User.query().findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    user: userQuery
  }
};
