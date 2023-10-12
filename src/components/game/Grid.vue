<script setup lang="ts">
  import { ref } from 'vue';
  import { useSudokuGridStore } from '@/stores/grid.store'
  import ValuePicker from "./ValuePicker.vue"
  import type { GridCell } from '@/interfaces/GridCell';

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

  function handleMouseDown(e: MouseEvent, cell: GridCell) {
    if (e.button === 2) {
      cell.hidden ? gridStore.resetCellInputValue(cell.colIndex, cell.rowIndex): undefined
      return
    }
    return cell.hidden ? setValuePickerToShow(cell.colIndex, cell.rowIndex): undefined
  }

  function handleValuePicked(colIndex: number, rowIndex: number, value: number) {
    gridStore.setCellInputValue(colIndex, rowIndex, value)
    gridStore.checkCol(value, colIndex, rowIndex, true)
    gridStore.checkRow(value, colIndex, rowIndex, true)
    gridStore.checkGroup(value, colIndex, rowIndex, true)
  }

</script>

<template>
  <div class="grid">
    <div v-for="col, colIndex in gridStore.grid" class="col">
        <div
          v-for="cell, rowIndex in col"
          class="cell"
          :class='{"cell_hidden": cell.hidden, "cell_conflicting": cell.isConflicting}'
          v-on:mousedown="(e) => handleMouseDown(e, cell)"
          v-on:mouseup="cell.hidden ? setValuePickerToShow(-1, -1): undefined"
          v-on:contextmenu="(e) => { e.preventDefault(); return false }"
        >
            <span>{{ cell.inputValue }}</span>
            <ValuePicker
              v-if="
                valuePickerIndexes.valuePickerColIndex === colIndex
                && valuePickerIndexes.valuePickerRowIndex === rowIndex
              "
              :onValuePicked=handleValuePicked
              :currentCell="cell"
            />
        </div>
    </div>
  </div>
</template>

<style scoped>
  .grid {
    display: flex;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
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

  .cell_conflicting {
    color: red;
  }


</style>
