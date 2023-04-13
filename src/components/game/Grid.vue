<script setup lang="ts">
  import { useSudokuGridStore } from '@/stores/grid'

  const gridStore = useSudokuGridStore()
</script>

<template>
  <div class="grid">
    <div v-for="col in gridStore.grid" class="col">
        <div v-for="cell in col" class="cell">
            <span>{{ cell }}</span>
        </div>
    </div>
  </div>
</template>

<style scoped>
  .grid {
    display: flex;
  }

  .grid > .col:first-child {
    border-left: 2px solid var(--color-green);
  }

  .col:nth-child(3n){
    border-right: 2px solid var(--color-green);
  }

  .col > .cell:first-child {
    border-top: 2px solid var(--color-green);
  }

  .col > .cell:nth-child(3n){
    border-bottom: 2px solid var(--color-green);
  }

  .cell {
    border: 1px solid var(--color-green);
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cell:hover {
    cursor: pointer;
    background-color: var(--color-green-dark);
  }
</style>
