import ProductValidator from './product.validator';

class CreateProductValidator extends ProductValidator {
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
