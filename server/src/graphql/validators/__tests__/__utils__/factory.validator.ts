import { CustomRule } from '../../rules.types';

export function runTestCases(
  name: string,
  validator: typeof BaseValidator,
  cases: Array<TestCase>
) {
  describe(name, () => {
    cases.forEach((testCase) => {
      const { name, data, expected, customRules = null } = testCase;

      test(name, async () => {
        try {
          const myValidator = customRules
            ? new validator(customRules)
            : new validator();

          const result = await myValidator.validate(data);
          expect(result).toEqual(expected);
        } catch (error) {
          expect(error).toEqual(expected);
        }
      });
    });
  });
}

export interface TestCase<Data = any, Expected = any> {
  name: string;
  data: Data;
  expected: Expected;
  customRules?: Array<CustomRule>;
}
