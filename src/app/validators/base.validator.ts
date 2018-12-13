import Validator, { ValidationErrors } from 'validatorjs';
import customRules from './custom_rules';

interface RequestBody {
  [key: string]: any;
}

interface Rules {
  [property: string]: string | string[];
}

class BaseValidator {
  private errors: ValidationErrors;

  constructor(protected data: RequestBody) {
    this.data = data;
    this.errors = null;
    this.registerCustomRules();
  }

  // eslint-disable-next-line class-methods-use-this
  registerCustomRules(): void {
    const { uniqueRule, existsRule } = customRules;

    Validator.registerAsync(
      uniqueRule.name,
      uniqueRule.callback,
      uniqueRule.message
    );
    Validator.registerAsync(
      existsRule.name,
      existsRule.callback,
      existsRule.message
    );
  }

  // eslint-disable-next-line class-methods-use-this
  rules(): Rules {
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

  get formattedErrors(): ValidationErrors {
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

export default BaseValidator;
