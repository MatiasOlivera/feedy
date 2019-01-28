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
  protected args: Args;

  constructor(customRules: Array<CustomRule> = defaultRules) {
    this.validator = Validator;
    this.registerCustomRules(customRules);
  }

  protected registerCustomRule(customRule: CustomRule): void {
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

  protected registerCustomRules(customRules: Array<CustomRule>): void {
    customRules.forEach((rule) => this.registerCustomRule(rule));
  }

  // eslint-disable-next-line class-methods-use-this
  protected rules(): Rules {
    return {};
  }

  public validate(value: Value, args?: Args): Promise<FlatValidationErrors> {
    this.args = args;

    return new Promise((resolve, reject) => {
      const validator = new Validator(value, this.rules());
      const handleFails = () => {
        const errors = validator.errors.all();
        const formattedErrors = this.formatErrors(errors);
        reject(formattedErrors);
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

  private formatErrors(originalErrors: ValidationErrors): FlatValidationErrors {
    const errors = Object.entries(originalErrors);
    const formattedErrors = errors.reduce((obj, [field, messages]) => {
      return { ...obj, [field]: messages[0] };
    }, {});
    return formattedErrors;
  }
}

type FlatValidationErrors = Dictionary<string>;

export default BaseValidator;
