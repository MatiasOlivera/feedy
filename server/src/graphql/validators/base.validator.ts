import { Dictionary } from 'lodash';
import Validator, { Rules, ValidationErrors } from 'validatorjs';

import { CustomRule } from './rules.types';

class BaseValidator<Value = any, Args = any> {
  private validator: Validator.ValidatorStatic;
  protected args: Args;

  constructor() {
    this.validator = Validator;
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
      const validator = new this.validator(value, this.rules());

      const onSuccess = () => resolve({});
      const onFails = () => {
        const errors = validator.errors.all();
        const formattedErrors = this.formatErrors(errors);
        reject(formattedErrors);
      };

      // Asynchronous handler
      if (validator.hasAsync) {
        validator.passes(() => onSuccess());
        validator.fails(() => onFails());
      }

      // Synchronous handler
      validator.passes() ? onSuccess() : onFails();
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
