exports.up = (knex) =>
  knex.schema.table('issues', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('issues', (table) => {
    table.dropColumn('deleted_at');
  });
