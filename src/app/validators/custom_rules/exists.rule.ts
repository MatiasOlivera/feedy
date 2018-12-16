import { knex } from '../../../services/db.service';
import { logger } from '../../../services/log.service';

const name: string = 'exists';

const message: string = 'The resource does not exists.';

// eslint-disable-next-line consistent-return
const callback = async (
  value: number | string,
  args: string,
  attribute: string,
  passes: Function
): Promise<any> => {
  const hasMultipleArgs = args.includes(',');
  let table: string = null;
  let column: string = null;

  if (hasMultipleArgs) {
    [table, column] = args.split(',');
  } else {
    table = args;
  }

  if (!table) throw new Error('The table name must be specified.');
  if (!column) throw new Error('The column name must be specified.');

  try {
    const row = await knex
      .select(column)
      .from(table)
      .where(column, value);

    if (row.length === 0) {
      return passes(false, message);
    }

    return passes();
  } catch (error) {
    logger.error('[exists rule] An error ocurred.', { error });
  }
};

export default { name, callback, message };
