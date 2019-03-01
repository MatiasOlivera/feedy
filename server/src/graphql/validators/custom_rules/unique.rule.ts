import { isEmpty } from 'lodash';
import { RegisterAsyncCallback } from 'validatorjs';

import { prisma } from '../../../database/prisma-client';
import { logger } from '../../../services/log.service';
import { CustomAsyncRule, RuleType, Params } from '../rules.types';

const type: RuleType = 'async';
const name: string = 'unique';
const message: string = 'The value has already been taken.';

export async function searchModelInTheDatabase(
  params: UniqueParams,
  db = prisma
): Promise<any> {
  const { model, field, value, idField, except } = params;

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

  return db.$graphql(query);
}

type UniqueParams = Params & {
  idField?: string;
  except?: string;
};

// eslint-disable-next-line consistent-return
const callback: RegisterAsyncCallback = async (
  value,
  args,
  attribute,
  passes,
  searchModel = searchModelInTheDatabase
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
  if (!field) throw new Error('The field name must be specified.');

  try {
    const data = await searchModel({ model, field, value, idField, except });

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
