import { defineStore } from "pinia";

// The Sudoku grid
type GridCell = {
  value: number;  // Real value
  hidden: boolean;  // Depend on the difficulty level
  inputValue: number;  // Value given by the player, can be different from the real value
}
type GridRow = GridCell[]
type Grid = GridRow[]

const MATRIX_LENGTH = 8;

interface IGridState {
  grid: Grid,
  initialized: boolean
}

export const useSudokuGridStore = defineStore("grid", {
  state: (): IGridState => ({
    grid: new(Array<Array<GridCell>>),
    initialized: false
  }),
  actions: {
    initGrid() {
      console.log("Initialization called");

      for (let i = 0; i <= MATRIX_LENGTH; i++) {
        this.grid[i] = []
        for (let j = 0; j <= MATRIX_LENGTH; j++) {
          const newCell: GridCell = {
            value: 0,
            inputValue: 0,
            hidden: false
          }
          this.grid[i][j] = newCell;
        }
      }

      this.initialized = true;
    },

    checkCol(input: number, colIndex: number, rowIndex: number): boolean {
      let ok = true;
      const colToVerify = this.grid[colIndex]
      const cellExistsWithThatValue = colToVerify.find((cell) => cell.inputValue === input)
      if (cellExistsWithThatValue) {
        ok = false;
      }
      return ok;
    },

    checkRow(input: number, colIndex: number, rowIndex: number): boolean {
      let ok = true;
      const row = this.grid.map((col) => col[rowIndex])
      const cellExistsWithThatValue = row.find((cell) => cell.inputValue === input)
      if (cellExistsWithThatValue) {
        ok = false
      }
      return ok
    },

    getIndexesToCheck(index: number): number[] {
      const modulo = index % 3;
      if (modulo == 0) {
        return [index, index + 1, index + 2]
      }
      if (modulo == 1) {
        return [index - 1, index, index + 1]
      }
      // modulo 2
      return [index - 2, index - 1, index]
    },

    checkGroup(input: number, colIndex: number, rowIndex: number): boolean {
      let ok = true;
      const colIndexesToCheck = this.getIndexesToCheck(colIndex);
      const rowIndexesToCheck = this.getIndexesToCheck(rowIndex);
      for (let i = 0; i < colIndexesToCheck.length; i++) {
        for (let j = 0; j < rowIndexesToCheck.length; i++) {
          if (!ok) {
            break;
          }
          if (i === colIndex && j === rowIndex) {
            continue;  // Go to next iteration
          }
          if (this.grid[i][j].inputValue == input) {
            ok = false;
          }
        }
      }
      return ok;
    }
  }
});
