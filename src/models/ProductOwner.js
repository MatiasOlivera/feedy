/* eslint-disable global-require */
const Model = require('./Model');

class ProductOwner extends Model {
  static get tableName() {
    return 'product_owners';
  }

  static get relationMappings() {
    const User = require('./User');
    const Organization = require('./Organization');
    const Product = require('./Product');

    const user = {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: { from: 'product_owners.id', to: 'users.id' }
    };

    const organization = {
      relation: Model.HasOneRelation,
      modelClass: Organization,
      join: { from: 'product_owners.id', to: 'organizations.id' }
    };

    const products = {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: { from: 'product_owners.id', to: 'products.owner_id' }
    };

    return { user, organization, products };
  }
}

module.exports = ProductOwner;
