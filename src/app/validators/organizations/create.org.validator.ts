import OrganizationValidator from './org.validator';

class CreateOrganizationValidator extends OrganizationValidator {
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      name: ['required', ...rules.name]
    };
  }
}

export default CreateOrganizationValidator;
