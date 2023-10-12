<script setup lang="ts">
  import type { GridCell } from "@/interfaces/GridCell";

  // Props

  const props = defineProps<{
    currentCell: GridCell,
    onValuePicked: (colIndex: number, rowIndex: number, value: number) => void
  }>()

</script>

<template>
  <div class="pickers">
    <span v-for="i in 9"
      v-on:mouseup="props.onValuePicked(props.currentCell.colIndex, props.currentCell.rowIndex, i)"
    >
      {{ i }}
    </span>
  </div>
</template>

<style scoped>
    .pickers {
        position: absolute;
        background-color: var(--color-green);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 12rem;
        height: 12rem;
        z-index: 1;
        border-radius: 50px;

        & > span {
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            color: var(--color-green);
            background-color: white;
            border-radius: 50px;
          }
        }
    }
</style>
