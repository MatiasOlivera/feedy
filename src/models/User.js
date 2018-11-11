/* eslint-disable object-shorthand */
/* eslint-disable func-names */

const bookshelf = require('../services/db.service');

const User = {
  tableName: 'users',

  owner: function() {
    return this.belongsTo('ProductOwner', 'id');
  },

  organizations: function() {
    return this.belongsToMany('Organization', 'users_organizations');
  },

  issues: function() {
    return this.hasMany('Issue');
  },

  comments: function() {
    return this.hasMany('Comment');
  }
};

module.exports = bookshelf.model('User', User);
