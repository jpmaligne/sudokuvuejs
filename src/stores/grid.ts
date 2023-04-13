import { defineStore } from "pinia";

// The Sudoku grid
type GridCell = number
type GridRow = GridCell[]
type Grid = GridRow[]

const MATRIX_LENGTH = 8;

interface IGridState {
  grid: Grid,
  initialized: boolean
}

export const useSudokuGridStore = defineStore("grid", {
  state: (): IGridState => ({
    grid: new(Array<Array<number>>),
    initialized: false
  }),
  actions: {
    initGrid() {
      console.log("Initialization called");

      for (let i = 0; i <= MATRIX_LENGTH; i++) {
        this.grid[i] = []
        for (let j = 0; j <= MATRIX_LENGTH; j++) {
          this.grid[i][j] = 0;
        }
      }

      this.initialized = true;
    }
  }
});
