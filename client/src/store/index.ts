import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { products } from './modules';

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    products
  }
};

export default new Vuex.Store(store);
