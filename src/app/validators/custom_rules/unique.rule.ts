const { knex } = require('../../../services/db.service');
const { logger } = require('../../../services/log.service');

const name: string = 'unique';

const message: string = 'The value has already been taken.';

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
  let except: string = null;
  let idColumn: string = null;

  if (hasMultipleArgs) {
    [table, column, except, idColumn = 'id'] = args.split(',');
  } else {
    table = args;
    column = attribute;
  }

  if (!table) throw new Error('The table name must be specified.');

  try {
    const query = knex
      .select(column)
      .from(table)
      .where(column, value);

    if (except) {
      query.whereNot(idColumn, except);
    }

    const row = await query;

    if (row.length === 0) return passes();

    return passes(false, message);
  } catch (error) {
    logger.error('[unique rule] An error ocurred.', { error });
  }
};

export default { name, callback, message };
