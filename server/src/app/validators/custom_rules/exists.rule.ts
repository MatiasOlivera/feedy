import { startCase } from 'lodash';

import { prisma } from '../../../database/prisma-client';
import { logger } from '../../../services/log.service';

const name: string = 'exists';

const message: string = 'The resource does not exists.';

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

export default { name, callback, message };
