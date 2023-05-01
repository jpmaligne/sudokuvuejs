<script setup lang="ts">
  import { useGameStore } from '@/stores/game.store'

  const gameStore = useGameStore()
</script>

<template>
  <div>
    <span>{{ gameStore.playTime }}</span>
  </div>
</template>