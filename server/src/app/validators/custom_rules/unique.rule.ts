import { isEmpty } from 'lodash';
import { RegisterAsyncCallback } from 'validatorjs';

import { prisma } from '../../../database/prisma-client';
import { logger } from '../../../services/log.service';
import { CustomAsyncRule, RuleType } from '../rules.types';

const type: RuleType = 'async';
const name: string = 'unique';
const message: string = 'The value has already been taken.';

// eslint-disable-next-line consistent-return
const callback: RegisterAsyncCallback = async (
  value,
  args,
  attribute,
  passes
) => {
  const hasMultipleArgs = args.includes(',');
  let model: string = null;
  let field: string = null;
  let except: string = null;
  let idField: string = null;

  if (hasMultipleArgs) {
    [model, field, except, idField = 'id'] = args.split(',');
  } else {
    model = args;
    field = attribute;
  }

  if (!model) throw new Error('The model name must be specified.');

  try {
    const exception = idField && except ? `${idField}_not: "${except}"` : '';

    const query = `
      query {
        ${model}(where: {
          AND: {
            ${field}: "${value}"
            ${exception}
          }
        }) {
          id
        }
      }
    `;
    const data = await prisma.$graphql(query);

    if (data && data[model] && !isEmpty(data[model])) {
      return passes(false, `The ${field} has already been taken.`);
    }

    return passes();
  } catch (error) {
    logger.error('[unique rule] An error ocurred.', { error });
  }
};

const rule: CustomAsyncRule = { type, name, callback, message };
export default rule;
