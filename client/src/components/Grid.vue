<template>
  <div>
    <div v-for="itemGroup in chunkItems" class="columns">
      <div v-for="item in itemGroup" class="column">
        <slot :item="item">
          <pre>{{ item }}</pre>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// Utils
import { chunk } from 'lodash';

// Props
const columnsProp = {
  type: Number,
  required: true,
  validator: (value: number): boolean => value > 0
};

const itemsProp = { type: Array, required: true };

@Component
class Grid extends Vue {
  @Prop(columnsProp)
  columns!: number;

  @Prop(itemsProp)
  items!: any[];

  get chunkItems() {
    return chunk(this.items, this.columns);
  }
}

export default Grid;
</script>

<style scoped></style>
