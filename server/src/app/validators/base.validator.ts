import { Dictionary } from 'lodash';
import Validator, { Rules, ValidationErrors } from 'validatorjs';

import customRules from './custom_rules';
import { CustomRule } from './rules.types';

const defaultRules: Array<CustomRule> = [
  customRules.existsRule,
  customRules.uniqueRule
];

class BaseValidator<Value = any, Args = any> {
  private validator: Validator.ValidatorStatic;
  private errors: ValidationErrors;
  protected args: Args;

  constructor(customRules: Array<CustomRule> = defaultRules) {
    this.errors = null;
    this.validator = Validator;
    this.registerCustomRules(customRules);
  }

  registerCustomRule(customRule: CustomRule): void {
    if (customRule.type === 'async') {
      this.validator.registerAsync(
        customRule.name,
        customRule.callback,
        customRule.message
      );
    } else {
      this.validator.register(
        customRule.name,
        customRule.callback,
        customRule.message
      );
    }
  }

  registerCustomRules(customRules: Array<CustomRule>): void {
    customRules.forEach((rule) => this.registerCustomRule(rule));
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
