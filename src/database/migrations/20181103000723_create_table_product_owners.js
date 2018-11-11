/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('product_owners', (table) => {
    table.increments('id').primary();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('product_owners');
};
