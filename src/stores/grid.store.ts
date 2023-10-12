import { defineStore } from "pinia";
import { useGameStore } from '@/stores/game.store'
import type { GridCell } from "@/interfaces/GridCell";

const gameStore = useGameStore()

// The Sudoku grid
type GridRow = GridCell[]
type Grid = GridRow[]

const MATRIX_LENGTH = 8;

interface IGridState {
  grid: Grid,
  initialized: boolean,
}

export const useSudokuGridStore = defineStore("grid", {
  state: (): IGridState => ({
    grid: new(Array<Array<GridCell>>),
    initialized: false,
  }),
  actions: {

    /**
     * Create an empty Cell for a column in the Grid
     * @param colIndex - The index of the column
     */
    resetCol(colIndex: number) {
      this.grid[colIndex] = []
      for (let j = 0; j <= MATRIX_LENGTH; j++) {
        const newCell: GridCell = {
          value: undefined,
          inputValue: undefined,
          hidden: false,
          rowIndex: -1,
          colIndex: -1,
          isConflicting: false,
        }

        this.grid[colIndex][j] = newCell;
      }
    },

    /**
     * Create the matrix and fill it with Cells having a value.
     */
    initGrid() {
      console.log("Initialization called");

      // First, fill the matrix with cells having undefined values
      for (let i = 0; i <= MATRIX_LENGTH; i++) {
        this.resetCol(i)
      }

      // Then override with sudoku values
      let resetCount = 0;
      for (let i = 0; i <= MATRIX_LENGTH; i++) {
        for (let j = 0; j <= MATRIX_LENGTH; j++) {
          const setted = this.fillTheGrid(i, j);
          if (!setted) {
            j = -1
            resetCount++;
            this.resetCol(i)
            if (resetCount > 8) {
              i = i - 1;
              resetCount = 0;
            }
          }
        }
      }

      this.initialized = true;
    },

    /**
     * Can Shuffle any array
     * @param array - An array to shuffle
     */
    shuffleArray(array: Array<any>) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },

    fillTheGrid(colIndex: number, rowIndex: number): boolean {
      const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.shuffleArray(possibleValues)

      for (const value of possibleValues) {
        const conflictOnColumn = this.checkCol(value, colIndex, rowIndex)
        if (conflictOnColumn) {
          continue;
        }

        const conflictOnRow = this.checkRow(value, colIndex, rowIndex)
        if (conflictOnRow) {
          continue;
        }

        const conflictOnGroup = this.checkGroup(value, colIndex, rowIndex)
        if (conflictOnGroup) {
          continue;
        }

        this.grid[colIndex][rowIndex].value = value;
        this.grid[colIndex][rowIndex].inputValue = value;
        this.grid[colIndex][rowIndex].colIndex = colIndex;
        this.grid[colIndex][rowIndex].rowIndex = rowIndex;
        return true;
      }
      return false;
    },

    checkCol(input: number, colIndex: number, rowIndex: number, setConflict: boolean = false): GridCell | undefined {
      const colToVerify = this.grid[colIndex]
      const conflictingCellOnCol = colToVerify.find((cell) => cell.inputValue === input)
      if (setConflict && conflictingCellOnCol) {
        conflictingCellOnCol.isConflicting = true
      }

      return conflictingCellOnCol
    },

    checkRow(input: number, colIndex: number, rowIndex: number, setConflict: boolean = false): GridCell | undefined {
      const row = this.grid.map((col) => col[rowIndex])

      const conflictingCellOnRow = row.find((cell) => cell.inputValue === input)
      if (setConflict && conflictingCellOnRow) {
        conflictingCellOnRow.isConflicting = true
      }

      return conflictingCellOnRow
    },

    getIndexesToCheck(index: number): number[] {
      const modulo = index % 3;
      if (modulo == 0) {
        return [index, index + 1, index + 2]
      }
      if (modulo == 1) {
        return [index - 1, index, index + 1]
      }
      // modulo == 2
      return [index - 2, index - 1, index]
    },

    checkGroup(input: number, colIndex: number, rowIndex: number, setConflict: boolean = false): GridCell | undefined {
      let conflictingCell = undefined;
      const colIndexesToCheck = this.getIndexesToCheck(colIndex);
      const rowIndexesToCheck = this.getIndexesToCheck(rowIndex);
      for (const i of colIndexesToCheck) {
        for (const j of rowIndexesToCheck) {
          if (i === colIndex && j === rowIndex) {
            continue;  // Go to next iteration
          }
          if (this.grid[i][j].inputValue == input) {
            conflictingCell = this.grid[i][j];
            break;
          }
        }
      }
      if (setConflict && conflictingCell) {
        conflictingCell.isConflicting = true
      }

      return conflictingCell;
    },

    hideCellsBasedOnDifficulty(difficulty: number): void {
      const nbCellsHidden = gameStore.hiddenCellsByDifficulty.get(difficulty)

      let i = 0
      while (i < nbCellsHidden!) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 9);
        if (this.grid[x][y].hidden == true) {
          continue
        }
        this.grid[x][y].hidden = true
        this.grid[x][y].inputValue = undefined

        i++
      }
    },

    setCellInputValue(colIndex: number, rowIndex: number, value: number): void {
      this.grid[colIndex][rowIndex].inputValue = value;
    },

    resetCellInputValue(colIndex: number, rowIndex: number): void {
      this.grid[colIndex][rowIndex].inputValue = undefined;
    },
  }
});
