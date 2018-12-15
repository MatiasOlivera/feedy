import Model from './Model';
import { IOrganization } from 'graphql-schema';

class Organization extends Model implements IOrganization {
  id: string;
  name: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  static get tableName(): string {
    return 'organizations';
  }

  static get relationMappings() {
    const productOwner = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'ProductOwner',
      join: { from: 'organizations.id', to: 'product_owners.id' }
    };

    const members = {
      relation: Model.ManyToManyRelation,
      modelClass: 'User',
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

export default Organization;
