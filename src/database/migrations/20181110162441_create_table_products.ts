/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.string('description', 100);

    table
      .integer('owner_id')
      .unsigned()
      .notNullable();

    table.timestamps(false, true);

    table
      .foreign('owner_id')
      .references('id')
      .inTable('product_owners');
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('products');
};
