const { knex } = require('../../../services/db.service');
const { logger } = require('../../../services/log.service');

const name = 'exists';

// eslint-disable-next-line consistent-return
const callback = async (value, args, attribute, passes) => {
  const hasMultipleArgs = args.includes(',');
  let table = null;
  let column = null;

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
      return passes(false, 'The resource does not exists.');
    }

    return passes();
  } catch (error) {
    logger.error('[exists rule] An error ocurred.', { error });
  }
};

module.exports = { name, callback };
