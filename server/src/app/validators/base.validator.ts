import Validator from 'validatorjs';

import customRules from './custom_rules';

interface ValidationRule {
  [field: string]: string | string[] | ValidationRule;
}

interface ValidationErrors {
  [field: string]: [string];
}

interface FlatValidationErrors {
  [field: string]: string;
}

class BaseValidator<T> {
  private errors: ValidationErrors;

  constructor(protected data: T) {
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
  rules(): ValidationRule {
    return {};
  }

  validate(): Promise<void> {
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

  get formattedErrors(): FlatValidationErrors {
    if (!this.errors) return null;

    const [flatErrors] = Object.entries(this.errors).map(
      ([attribute, messages]) => ({
        [attribute]: messages[0]
      })
    );

    return flatErrors;
  }
}

export default BaseValidator;
