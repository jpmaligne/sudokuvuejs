export type GridCell = {
    value: number | undefined;  // Real value
    hidden: boolean;  // Depend on the difficulty level
    inputValue: number | undefined;  // Value given by the player, can be different from the real value
    rowIndex: number;
    colIndex: number;
    isConflicting: boolean;
}