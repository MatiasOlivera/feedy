import Model from './Model';
import { IIssue } from 'graphql-schema';

class Issue extends Model implements IIssue {
  id: string;
  title: string;
  body: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  static get tableName(): string {
    return 'issues';
  }

  static get relationMappings() {
    const author = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      join: { from: 'issues.user_id', to: 'users.id' }
    };

    const product = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Product',
      join: { from: 'issues.product_id', to: 'products.id' }
    };

    const comments = {
      relation: Model.ManyToManyRelation,
      modelClass: 'Comment',
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

export default Issue;
