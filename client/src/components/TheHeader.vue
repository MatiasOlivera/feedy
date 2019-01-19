<template>
  <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: routes.home }" class="navbar-item is-size-5">
          <strong>Feedly</strong>
        </router-link>

        <a
          :class="{ 'is-active': isActive }"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="menu"
          @click="burgerClick"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="menu" :class="{ 'is-active': isActive }" class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{ name: routes.home }" class="navbar-item">Home</router-link>
          <router-link :to="{ name: routes.products }" class="navbar-item">Products</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Routes
import { ROUTE_HOME, ROUTE_PRODUCTS } from '../router';

interface Routes {
  [name: string]: string;
}

@Component({})
export default class TheHeader extends Vue {
  routes: Routes = {
    home: ROUTE_HOME,
    products: ROUTE_PRODUCTS
  };

  isActive: boolean = false;

  burgerClick(): void {
    this.isActive = !this.isActive;
  }
}
</script>

<style scoped>
</style>
