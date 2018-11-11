/* eslint-disable object-shorthand */
/* eslint-disable func-names */

const bookshelf = require('../services/db.service');

const Product = {
  tableName: 'products',

  owner: function() {
    return this.belongsTo('ProductOwner', 'owner_id');
  },

  issues: function() {
    return this.hasMany('Issue');
  }
};

module.exports = bookshelf.model('Product', Product);
