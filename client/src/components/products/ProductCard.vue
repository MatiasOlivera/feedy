<template>
  <div v-if="product" class="box">
    <h1
      class="title is-size-6 has-text-primary has-text-grey-dark has-text-weight-bold has-text-centered"
    >{{ product.name }}</h1>
    <p class="subtitle is-size-6 has-text-grey has-text-justified">{{ product.description }}</p>
    <div class="buttons is-centered">
      <a href="#" class="button is-small is-link is-outlined is-rounded">View</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// Types
import { Product } from '../../types/products.types';

// Props
const productProp = { type: Object, required: true };

@Component
class ProductCard extends Vue {
  @Prop(productProp)
  product!: Product;
}

export default ProductCard;
</script>

<style scoped></style>
