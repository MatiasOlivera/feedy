<template>
  <div class="has-background-white-bis">
    <the-header />

    <div class="section">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import TheHeader from './components/TheHeader.vue';

@Component({
  components: { TheHeader }
})
export default class App extends Vue {}
</script>

<style scoped>
</style>
