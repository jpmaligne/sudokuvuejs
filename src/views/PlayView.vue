<script setup lang="ts">
  import { useSudokuGridStore } from '@/stores/grid.store'
  import Grid from "../components/game/Grid.vue"

  const gridStore = useSudokuGridStore()
  if (!gridStore.initialized) {
    gridStore.initGrid();
  }


</script>

<template>
  <div class="board">
    <h1>Have fun</h1>
    <Grid />
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .board {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
