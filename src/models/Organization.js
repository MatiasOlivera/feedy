/* eslint-disable object-shorthand */
/* eslint-disable func-names */

const bookshelf = require('../services/db.service');

const Organization = {
  tableName: 'organizations',

  owner: function() {
    return this.belongsTo('ProductOwner', 'id', 'id');
  },

  members: function() {
    return this.belongsToMany('User', 'users_organizations');
  }
};

module.exports = bookshelf.model('Organization', Organization);
