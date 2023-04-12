<script setup lang="ts">
  import { useSudokuGridStore } from '@/stores/grid'

  const gridStore = useSudokuGridStore()
  gridStore.initGrid()
  console.log(gridStore.grid);
</script>

<template>
  <div class="about">
    <h1>Good luck</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
