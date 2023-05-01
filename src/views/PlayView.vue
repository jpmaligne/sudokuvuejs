<script setup lang="ts">
  import { useSudokuGridStore } from '@/stores/grid.store'
  import { useGameStore } from '@/stores/game.store'
  import DifficultyPicker from "../components/game/DifficultyPicker.vue"
  import Grid from "../components/game/Grid.vue"
  import Timer from "../components/game/Timer.vue"

  const gridStore = useSudokuGridStore()
  if (!gridStore.initialized) {
    gridStore.initGrid();
  }

  const gameStore = useGameStore();

</script>

<template>
  <div class="board">
    <h1 v-if=gameStore.difficulty>Have fun</h1>
    <h2 v-if=!gameStore.difficulty>Choose difficulty</h2>

    <DifficultyPicker  v-if=!gameStore.difficulty />
    <Grid v-if=gameStore.difficulty />
    <Timer v-if=gameStore.difficulty />
  </div>

</template>

<style>
h2 {
  margin-bottom: 1rem;
}
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
