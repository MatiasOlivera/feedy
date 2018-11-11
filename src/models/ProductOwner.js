/* eslint-disable object-shorthand */
/* eslint-disable func-names */

const bookshelf = require('../services/db.service');

const ProductOwner = {
  tableName: 'product_owners',

  user: function() {
    return this.hasOne('User', 'id');
  },

  organization: function() {
    return this.hasOne('Organization', 'id');
  },

  products: function() {
    return this.hasMany('Product', 'owner_id');
  }
};

module.exports = bookshelf.model('ProductOwner', ProductOwner);
