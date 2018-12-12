import Model from './Model';

class Product extends Model {
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
