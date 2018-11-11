/* eslint-disable object-shorthand */
/* eslint-disable func-names */

const bookshelf = require('../services/db.service');

const Comment = {
  tableName: 'comments',

  issues: function() {
    return this.belongsToMany('Issue', 'issues_comments');
  },

  author: function() {
    return this.belongsTo('User');
  },

  parent: function() {
    return this.belongsTo('Comment', 'parent_id');
  },

  children: function() {
    return this.hasMany('Comment', 'parent_id');
  }
};

module.exports = bookshelf.model('Comment', Comment);
