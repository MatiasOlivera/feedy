const { User } = require('../../../../models');
const paginate = require('../../_utils/pagination');

const usersQuery = async (root, args) => {
  try {
    return await paginate(User, args);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    users: usersQuery
  }
};
