const OrganizationValidator = require('./org.validator');

class UpdateOrganizationValidator extends OrganizationValidator {
  rules() {
    return super.rules();
  }
}

module.exports = UpdateOrganizationValidator;
