const { knex } = require('../../../services/db.service');
const { logger } = require('../../../services/log.service');

const name = 'unique';

// eslint-disable-next-line consistent-return
const callback = async (value, args, attribute, passes) => {
  const hasMultipleArgs = args.includes(',');
  let table = null;
  let column = null;
  let except = null;
  let idColumn = null;

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

    return passes(false, 'The value has already been taken.');
  } catch (error) {
    logger.error('[unique rule] An error ocurred.', { error });
  }
};

module.exports = { name, callback };
