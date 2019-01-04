import { isEmpty } from 'lodash';

import { prisma } from '../../../database/prisma-client';
import { logger } from '../../../services/log.service';

const name: string = 'unique';

const message: string = 'The value has already been taken.';

// eslint-disable-next-line consistent-return
const callback = async (
  value: number | string,
  args: string,
  attribute: string,
  passes: Function
): Promise<Function> => {
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
      return passes(false, message);
    }

    return passes();
  } catch (error) {
    logger.error('[unique rule] An error ocurred.', { error });
  }
};

export default { name, callback, message };
