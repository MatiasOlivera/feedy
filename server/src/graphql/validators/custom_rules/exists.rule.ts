import { startCase } from 'lodash';

import { prisma } from '../../../database/prisma-client';
import { logger } from '../../../services/log.service';
import {
  AsyncCallback,
  CustomAsyncRule,
  RuleType,
  Params
} from '../rules.types';

const type: RuleType = 'async';
const name: string = 'exists';
const message: string = 'The resource does not exists.';

export async function searchModelInTheDatabase(
  params: Params,
  db = prisma
): Promise<any> {
  const { model, field, value } = params;

  const query = `
      query {
        ${model}( where: { ${field}: "${value}" }) {
          id
        }
      }
    `;
  return db.$graphql(query);
}

// eslint-disable-next-line consistent-return
const callback: AsyncCallback = async (
  value,
  args,
  attribute,
  passes,
  searchModel = searchModelInTheDatabase
) => {
  const hasMultipleArgs = args.includes(',');
  let model: string = null;
  let field: string = null;

  if (hasMultipleArgs) {
    [model, field] = args.split(',');
  } else {
    model = args;
    field = attribute;
  }

  if (!model) throw new Error('The model name must be specified.');
  if (!field) throw new Error('The field name must be specified.');

  try {
    const data = await searchModel({ model, field, value });

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
