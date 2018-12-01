const createUser = require('./users/create.user.mutation');
const updateUser = require('./users/update.user.mutation');
const deleteUser = require('./users/delete.user.mutation');
const createOrganization = require('./organizations/create.org.mutation');
const updateOrganization = require('./organizations/update.org.mutation');

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  createOrganization,
  updateOrganization
};
