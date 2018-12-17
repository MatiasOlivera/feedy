/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('users_organizations', (table) => {
    table.integer('user_id').unsigned();
    table.integer('organization_id').unsigned();
    table.timestamps(false, true);

    table.primary(['user_id', 'organization_id']);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users');

    table
      .foreign('organization_id')
      .references('id')
      .inTable('organizations');
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('users_organizations');
};
