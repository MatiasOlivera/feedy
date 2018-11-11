/* eslint-disable object-shorthand */
/* eslint-disable func-names */

const bookshelf = require('../services/db.service');

const Issue = {
  tableName: 'issues',

  product: function() {
    return this.belongsTo('Product');
  },

  author: function() {
    return this.belongsTo('User');
  },

  comments: function() {
    return this.belongsToMany('Comment', 'issues_comments');
  }
};

module.exports = bookshelf.model('Issue', Issue);
