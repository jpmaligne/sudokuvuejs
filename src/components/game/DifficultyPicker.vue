<script setup lang="ts">
  import { useGameStore } from '@/stores/game.store'

  const gameStore = useGameStore()
</script>

<template>
  <div class="diff-picker">
    <div
        v-for="difficulty in gameStore.availableDifficulties"
        class="difficulty"
        v-on:click="gameStore.setGameDifficulty(difficulty)"
    >
        <span>{{ difficulty }}</span>
    </div>
  </div>
</template>

<style>
  .diff-picker {
    display: flex;
  }
  .difficulty {
    padding: 1rem;
    border: 1px solid var(--color-green);
  }
  .difficulty:hover {
    cursor: pointer;
    background-color: var(--color-green-dark);
  }
</style>