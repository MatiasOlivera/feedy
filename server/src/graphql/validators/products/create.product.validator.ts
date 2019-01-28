import { MutationResolvers } from '../../../graphql/resolvers.types';
import ProductValidator from './product.validator';

class CreateProductValidator extends ProductValidator<
  MutationResolvers.CreateProductInput
> {
  rules() {
    const rules = super.rules();

    return {
      ...rules,
      name: ['required', ...rules.name],
      ownerId: ['required', ...rules.ownerId]
    };
  }
}

export default CreateProductValidator;
