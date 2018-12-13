import Knex from 'knex';

exports.up = (knex: Knex) =>
  knex.schema.table('product_owners', (table) => {
    table.dateTime('deleted_at');
  });

exports.down = (knex: Knex) =>
  knex.schema.table('product_owners', (table) => {
    table.dropColumn('deleted_at');
  });
