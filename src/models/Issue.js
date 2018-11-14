/* eslint-disable global-require */
const Model = require('./Model');

class Issue extends Model {
  static get tableName() {
    return 'issues';
  }

  static get relationMappings() {
    const User = require('./User');
    const Product = require('./Product');
    const Comment = require('./Comment');

    const author = {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: { from: 'issues.user_id', to: 'users.id' }
    };

    const product = {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: { from: 'issues.product_id', to: 'products.id' }
    };

    const comments = {
      relation: Model.ManyToManyRelation,
      modelClass: Comment,
      join: {
        from: 'issues.id',
        through: {
          from: 'issues_comments.issue_id',
          to: 'issues_comments.comment_id'
        },
        to: 'comments.id'
      }
    };

    return { author, product, comments };
  }
}

module.exports = Issue;
