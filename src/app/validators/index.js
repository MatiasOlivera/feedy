const CreateUserValidator = require('./users/create.user.validator');
const UpdateUserValidator = require('./users/update.user.validator');
const CreateOrganizationValidator = require('./organizations/create.org.validator');
const UpdateOrganizationValidator = require('./organizations/update.org.validator');
const CreateProductValidator = require('./products/create.product.validator');
const UpdateProductValidator = require('./products/update.product.validator');
const CreateIssueValidator = require('./issues/create.issue.validator');
const UpdateIssueValidator = require('./issues/update.issue.validator');
const CreateCommentValidator = require('./comments/create.comment.validator');

module.exports = {
  CreateUserValidator,
  UpdateUserValidator,
  CreateOrganizationValidator,
  UpdateOrganizationValidator,
  CreateProductValidator,
  UpdateProductValidator,
  CreateIssueValidator,
  UpdateIssueValidator,
  CreateCommentValidator
};
