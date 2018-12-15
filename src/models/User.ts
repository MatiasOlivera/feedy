import Model from './Model';
import { IUser } from 'graphql-schema';

class User extends Model implements IUser {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  email: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  static get tableName(): string {
    return 'users';
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static get relationMappings() {
    const productOwner = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'ProductOwner',
      join: { from: 'users.id', to: 'product_owners.id' }
    };

    const organizations = {
      relation: Model.ManyToManyRelation,
      modelClass: 'Organization',
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
      modelClass: 'Issue',
      join: { from: 'users.id', to: 'issues.user_id' }
    };

    const comments = {
      relation: Model.HasManyRelation,
      modelClass: 'Comment',
      join: { from: 'users.id', to: 'comments.user_id' }
    };

    return { productOwner, organizations, issues, comments };
  }
}

export default User;
