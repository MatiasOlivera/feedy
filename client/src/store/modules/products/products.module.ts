// TS types
import { Module } from 'vuex';
import { RootState } from '@/store';
import { Product } from '../../../types/products.types';

// Vuex types
import { GET_PRODUCTS } from '@/store/types/actions.types';
import {
  SET_PRODUCTS,
  SET_PRODUCTS_LOADING,
  SET_PRODUCTS_ERROR
} from '@/store/types/mutations.types';

// Api
import api from '@/services/api/products.api';

interface ProductsState {
  products: {
    loading: boolean;
    data: Product[] | null;
    error: string | null;
  };
}

const module: Module<ProductsState, RootState> = {
  namespaced: true,

  state: {
    products: {
      loading: false,
      data: null,
      error: null
    }
  },

  actions: {
    async [GET_PRODUCTS]({ commit }) {
      try {
        commit(SET_PRODUCTS_LOADING, true);

        const {
          data: { products }
        } = await api.getProducts();

        commit(SET_PRODUCTS, products);
        commit(SET_PRODUCTS_ERROR, null);
      } catch (err) {
        commit(SET_PRODUCTS, null);
        commit(SET_PRODUCTS_ERROR, err);
      } finally {
        commit(SET_PRODUCTS_LOADING, false);
      }
    }
  },

  mutations: {
    [SET_PRODUCTS_LOADING](state, loading: boolean) {
      state.products.loading = loading;
    },

    [SET_PRODUCTS](state, products: Product[]) {
      state.products.data = products;
    },

    [SET_PRODUCTS_ERROR](state, error: string) {
      state.products.error = error;
    }
  }
};

export default module;
