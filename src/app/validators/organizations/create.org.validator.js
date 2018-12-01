const OrganizationValidator = require('./org.validator');

class CreateOrganizationValidator extends OrganizationValidator {
  rules() {
    const rules = super.rules();
    rules.name = ['required', ...rules.name];
    return rules;
  }
}

module.exports = CreateOrganizationValidator;
