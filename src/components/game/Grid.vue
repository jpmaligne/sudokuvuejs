<script setup lang="ts">
  import { ref } from 'vue';
  import { useSudokuGridStore } from '@/stores/grid.store'
  import ValuePicker from "./ValuePicker.vue"

  const gridStore = useSudokuGridStore()
  const valuePickerIndexes = ref({
    valuePickerColIndex: -1,
    valuePickerRowIndex: -1
})

  // Functions
  function setValuePickerToShow(colIndex: number, rowIndex: number) {
    valuePickerIndexes.value.valuePickerColIndex = colIndex
    valuePickerIndexes.value.valuePickerRowIndex = rowIndex
  }
</script>

<template>
  <div class="grid">
    <div v-for="col, colIndex in gridStore.grid" class="col">
        <div
          v-for="cell, rowIndex in col"
          class="cell"
          v-bind:class='cell.hidden ? "cell_hidden" : ""'
          v-on:mousedown="setValuePickerToShow(colIndex, rowIndex)"
          v-on:mouseup="setValuePickerToShow(-1, -1)"
        >
            <span>{{ cell.inputValue }}</span>
            <ValuePicker
              v-if="
                valuePickerIndexes.valuePickerColIndex === colIndex
                && valuePickerIndexes.valuePickerRowIndex === rowIndex
              "
            />
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
    font-weight: 500;
    font-size: 2rem;
    border: 1px solid var(--color-green);
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cell_hidden {

    &:hover {
      cursor: pointer;
      background-color: var(--color-green-dark);
    }

    &>span {
      color: blue;
    }
  }


</style>
