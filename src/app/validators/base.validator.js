const Validator = require('validatorjs');
const customRules = require('./custom_rules');

class BaseValidator {
  constructor(data) {
    this.data = data;
    this.errors = null;
    this.registerCustomRules();
  }

  // eslint-disable-next-line class-methods-use-this
  registerCustomRules() {
    const { uniqueRule } = customRules;

    Validator.registerAsync(uniqueRule.name, uniqueRule.callback);
  }

  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {};
  }

  validate() {
    return new Promise((resolve, reject) => {
      const validator = new Validator(this.data, this.rules());
      const handleFails = () => {
        this.errors = validator.errors.all();
        reject(this.formattedErrors);
      };

      // Asynchronous handler
      if (validator.hasAsync) {
        validator.passes(() => resolve());
        validator.fails(() => handleFails());
      } else {
        // Synchronous handler
        // eslint-disable-next-line no-lonely-if
        if (validator.passes()) {
          resolve();
        } else {
          handleFails();
        }
      }
    });
  }

  get formattedErrors() {
    if (!this.errors) return null;

    const keys = Object.keys(this.errors);
    const formattedErrors = { ...this.errors };

    keys.forEach((key) => {
      const [message] = this.errors[key];
      formattedErrors[key] = message;
    });

    return formattedErrors;
  }
}

module.exports = BaseValidator;
