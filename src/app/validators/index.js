const CreateUserValidator = require('./users/create.user.validator');
const UpdateUserValidator = require('./users/update.user.validator');
const CreateOrganizationValidator = require('./organizations/create.org.validator');
const UpdateOrganizationValidator = require('./organizations/update.org.validator');
const CreateProductValidator = require('./products/create.product.validator');

module.exports = {
  CreateUserValidator,
  UpdateUserValidator,
  CreateOrganizationValidator,
  UpdateOrganizationValidator,
  CreateProductValidator
};
