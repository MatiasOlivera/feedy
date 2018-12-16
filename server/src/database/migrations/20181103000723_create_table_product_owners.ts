/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('product_owners', (table) => {
    table.increments('id').primary();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('product_owners');
};
