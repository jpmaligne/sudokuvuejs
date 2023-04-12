import { defineStore } from "pinia";

// The Sudoku grid
//type GridCell = number
//type GridRow = GridCell[]
//type Grid = GridRow[]

const MATRIX_LENGTH = 8;

export const useSudokuGridStore = defineStore("grid", {
  state: () => ({
    grid: new(Array<Array<number>>)
  }),
  actions: {
    initGrid() {
      console.log("initialisation called");
      
      for (let i = 0; i <= MATRIX_LENGTH; i++) {
        this.grid[i] = []
        for (let j = 0; j <= MATRIX_LENGTH; j++) {
          this.grid[i][j] = 0;
        }
      }
    }
  }
});