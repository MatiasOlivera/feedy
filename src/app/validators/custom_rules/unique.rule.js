const { knex } = require('../../../services/db.service');
const { logger } = require('../../../services/log.service');

const name = 'unique';

// eslint-disable-next-line consistent-return
const callback = async (value, args, attribute, passes) => {
  const hasMultipleArgs = args.includes(',');
  let table = null;
  let column = null;

  if (hasMultipleArgs) {
    [table, column] = args.split(',');
  } else {
    table = args;
    column = attribute;
  }

  if (!table) throw new Error('The table name must be specified.');

  try {
    const [row] = await knex
      .select(column)
      .from(table)
      .where(column, value);

    if (!row) return passes();

    return passes(false, 'The value has already been taken.');
  } catch (error) {
    logger.error('[unique rule] An error ocurred.', { error });
  }
};

module.exports = { name, callback };
