import Model from './Model';
import { IComment } from 'graphql-schema';

class Comment extends Model implements IComment {
  id: string;
  body: string;
  userId: string;
  issueId: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  static get tableName(): string {
    return 'comments';
  }

  static get relationMappings() {
    const author = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      join: { from: 'comments.user_id', to: 'users.id' }
    };

    const issue = {
      relation: Model.HasOneThroughRelation,
      modelClass: 'Issue',
      join: {
        from: 'comments.id',
        through: {
          from: 'issues_comments.comment_id',
          to: 'issues_comments.issue_id'
        },
        to: 'issues.id'
      }
    };

    const parent = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Comment',
      join: { from: 'comments.parent_id', to: 'comments.id' }
    };

    const children = {
      relation: Model.HasManyRelation,
      modelClass: 'Comment',
      join: { from: 'comments.id', to: 'comments.parent_id' }
    };

    return { author, issue, parent, children };
  }
}

export default Comment;