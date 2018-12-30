import Vue from 'vue';
import Router from 'vue-router';

// Views
import HomeView from './views/HomeView.vue';
import ProductsView from './views/ProductsView.vue';

// Routes
export const ROUTE_HOME = 'home';
export const ROUTE_PRODUCTS = 'products';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: ROUTE_HOME,
      path: '/',
      component: HomeView
    },
    {
      name: ROUTE_PRODUCTS,
      path: '/products',
      component: ProductsView
    }
  ]
});
