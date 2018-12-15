import Model from './Model';
import { IProduct } from 'graphql-schema';

class Product extends Model implements IProduct {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  static get tableName(): string {
    return 'products';
  }

  static get relationMappings() {
    const owner = {
      relation: Model.BelongsToOneRelation,
      modelClass: 'ProductOwner',
      join: { from: 'products.owner_id', to: 'product_owners.id' }
    };

    const issues = {
      relation: Model.HasManyRelation,
      modelClass: 'Issue',
      join: { from: 'products.id', to: 'issues.product_id' }
    };

    return { owner, issues };
  }
}

export default Product;
