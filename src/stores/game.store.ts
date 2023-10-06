import { defineStore } from "pinia";


interface IGameState {
  availableDifficulties: number[],
  hiddenCellsByDifficulty: Map<number, number>
  difficulty: number,
  playTime: number,
  intervalID: number,
}

export const useGameStore = defineStore("game", {
  state: (): IGameState => ({
    availableDifficulties: [1, 2, 3],
    hiddenCellsByDifficulty: new Map<number, number>([[1, 20], [2, 40], [3, 60]]),
    difficulty: 0,
    playTime: 0,
    intervalID: 0,
  }),
  actions: {
    async setGameDifficulty(difficulty: number) {
        this.difficulty = difficulty;
        this.startGame();
    },
    /**
     * Used to handle timer when starting or resuming a run.
     */
    startGame() {
        const intervalID = setInterval(
            () => this.playTime += 1,
            1000
        )
        this.intervalID = intervalID;
    },
    pauseGame() {
        clearInterval(this.intervalID);
    }
  }
});
