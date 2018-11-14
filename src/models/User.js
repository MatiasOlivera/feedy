/* eslint-disable global-require */
const Model = require('./Model');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const ProductOwner = require('./ProductOwner');
    const Organization = require('./Organization');
    const Issue = require('./Issue');
    const Comment = require('./Comment');

    const productOwner = {
      relation: Model.BelongsToOneRelation,
      modelClass: ProductOwner,
      join: { from: 'users.id', to: 'product_owners.id' }
    };

    const organizations = {
      relation: Model.ManyToManyRelation,
      modelClass: Organization,
      join: {
        from: 'users.id',
        through: {
          from: 'users_organizations.user_id',
          to: 'users_organizations.organization_id'
        },
        to: 'organizations.id'
      }
    };

    const issues = {
      relation: Model.HasManyRelation,
      modelClass: Issue,
      join: { from: 'users.id', to: 'issues.user_id' }
    };

    const comments = {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: { from: 'users.id', to: 'comments.user_id' }
    };

    return { productOwner, organizations, issues, comments };
  }
}

module.exports = User;
