import Knex from 'knex';

exports.up = (knex: Knex) =>
  knex.schema.table('comments', (table) => {
    table.dateTime('deleted_at');
  });

exports.down = (knex: Knex) =>
  knex.schema.table('comments', (table) => {
    table.dropColumn('deleted_at');
  });
