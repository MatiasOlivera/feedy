/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('users_organizations', (table) => {
    table.integer('user_id', 10).unsigned();
    table.integer('organization_id', 10).unsigned();
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

exports.down = (knex) => {
  return knex.schema.dropTable('users_organizations');
};
