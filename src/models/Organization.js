/* eslint-disable global-require */
// eslint-disable-next-line prefer-destructuring
const Model = require('objection').Model;

class Organization extends Model {
  static get tableName() {
    return 'organizations';
  }

  static get relationMappings() {
    const ProductOwner = require('./ProductOwner');
    const User = require('./User');

    const productOwner = {
      relation: Model.BelongsToOneRelation,
      modelClass: ProductOwner,
      join: { from: 'organizations.id', to: 'product_owners.id' }
    };

    const members = {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'organizations.id',
        through: {
          from: 'users_organizations.organization_id',
          to: 'users_organizations.user_id'
        },
        to: 'users.id'
      }
    };

    return { productOwner, members };
  }
}

module.exports = Organization;
