import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { ProductsModule } from './modules';

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    ProductsModule
  }
};

export default new Vuex.Store(store);
