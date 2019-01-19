<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              type="text"
              class="input is-rounded"
              placeholder="Search for a product or service"
            >
          </div>
          <div class="control">
            <button class="button is-primary is-rounded">Search</button>
          </div>
        </div>
      </div>
    </div>

    <Grid v-if="products" :items="products" :columns="4">
      <template slot-scope="{ item: product }">
        <ProductCard :product="product"/>
      </template>
    </Grid>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Router
import { Route } from 'vue-router';

// Store
import { State, namespace } from 'vuex-class';
import { PRODUCTS_MODULE } from '../store/types/modules.types';
import { GET_PRODUCTS } from '../store/types/actions.types';
import store from '../store';

// Components
import Grid from '../components/Grid.vue';
import ProductCard from '../components/products/ProductCard.vue';

// Types
import { Product } from '../types/products.types';

const getProducts = (next: Function) => {
  const loading = Vue.prototype.$loading.open();

  store
    .dispatch(`${PRODUCTS_MODULE}/${GET_PRODUCTS}`)
    .then(() => next(() => loading.close()))
    .catch(() => next(false));
};

const ProductsModule = namespace(PRODUCTS_MODULE);

const options = {
  components: {
    Grid,
    ProductCard
  }
};

@Component(options)
class ProductsView extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    getProducts(next);
  }

  beforeRouteUpdate(to: Route, from: Route, next: Function): void {
    getProducts(next);
  }

  @ProductsModule.State((state) => state.products.data)
  products!: Product[] | null;
}

export default ProductsView;
</script>

<style scoped></style>
