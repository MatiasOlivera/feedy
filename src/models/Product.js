/* eslint-disable global-require */
// eslint-disable-next-line prefer-destructuring
const Model = require('objection').Model;

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    const ProductOwner = require('./ProductOwner');
    const Issue = require('./Issue');

    const owner = {
      relation: Model.BelongsToOneRelation,
      modelClass: ProductOwner,
      join: { from: 'products.owner_id', to: 'product_owners.id' }
    };

    const issues = {
      relation: Model.HasManyRelation,
      modelClass: Issue,
      join: { from: 'products.id', to: 'issues.product_id' }
    };

    return { owner, issues };
  }
}

module.exports = Product;
