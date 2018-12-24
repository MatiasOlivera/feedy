import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

// Modules
import { ProductsModule } from './modules';

// Modules names
import { PRODUCTS_MODULE } from './types/modules.types';

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    [PRODUCTS_MODULE]: ProductsModule
  }
};

export default new Vuex.Store(store);
