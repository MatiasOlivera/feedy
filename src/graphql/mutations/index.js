const createUser = require('./users/create.user.mutation');
const updateUser = require('./users/update.user.mutation');
const deleteUser = require('./users/delete.user.mutation');
const createOrganization = require('./organizations/create.org.mutation');

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  createOrganization
};
