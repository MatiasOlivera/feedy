/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('organizations', (table) => {
    table
      .integer('id')
      .unsigned()
      .primary();

    table.string('name', 50).notNullable();
    table.string('bio', 255);
    table.timestamps(false, true);

    table
      .foreign('id')
      .references('id')
      .inTable('product_owners');
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('organizations');
};
