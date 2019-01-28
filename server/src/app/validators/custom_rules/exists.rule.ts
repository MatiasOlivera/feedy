import { startCase } from 'lodash';
import { RegisterAsyncCallback } from 'validatorjs';

import { prisma } from '../../../database/prisma-client';
import { logger } from '../../../services/log.service';
import { CustomAsyncRule, RuleType } from '../rules.types';

const type: RuleType = 'async';
const name: string = 'exists';
const message: string = 'The resource does not exists.';

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

  if (hasMultipleArgs) {
    [model, field] = args.split(',');
  } else {
    model = args;
  }

  if (!model) throw new Error('The model name must be specified.');
  if (!field) throw new Error('The field name must be specified.');

  try {
    const query = `
      query {
        ${model}( where: { ${field}: "${value}" }) {
          id
        }
      }
    `;
    const data = await prisma.$graphql(query);

    if (data && data[model]) {
      return passes();
    }

    return passes(false, `${startCase(model)} does not exists.`);
  } catch (error) {
    logger.error('[exists rule] An error ocurred.', { error });
  }
};

const rule: CustomAsyncRule = { type, name, callback, message };
export default rule;
