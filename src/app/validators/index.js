const CreateUserValidator = require('./users/create.user.validator');
const UpdateUserValidator = require('./users/update.user.validator');
const CreateOrganizationValidator = require('./organizations/create.org.validator');
const UpdateOrganizationValidator = require('./organizations/update.org.validator');

module.exports = {
  CreateUserValidator,
  UpdateUserValidator,
  CreateOrganizationValidator,
  UpdateOrganizationValidator
};
