import { Dictionary } from 'lodash';
import Validator, { Rules, ValidationErrors } from 'validatorjs';

import customRules from './custom_rules';

class BaseValidator<Value = any, Args = any> {
  private errors: ValidationErrors;
  protected args: Args;

  constructor() {
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

  validate(value: Value, args?: Args): Promise<FlatValidationErrors> {
    this.args = args;

    return new Promise((resolve, reject) => {
      const validator = new Validator(value, this.rules());
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

    let errorsDict: FlatValidationErrors = {};

    const errors = Object.entries(this.errors);
    errors.forEach(([attr, msg]) => (errorsDict[attr] = msg[0]));

    return errorsDict;
  }
}

type FlatValidationErrors = Dictionary<string>;

export default BaseValidator;
