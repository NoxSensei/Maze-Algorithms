import {MazeNode} from "@/app/algorithms/_common/models/maze-node";

export class Maze {
    public grid: MazeNode[][];
    public history: MazeNode[];

    public constructor(public readonly rowsCount: number, public readonly columnsCount: number) {
        const grid = Array.from(
            new Array(rowsCount),
            () => new Array(columnsCount).fill(undefined)
        );
        for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                grid[rowIndex][columnIndex] = new MazeNode(rowIndex, columnIndex);
            }
        }

        this.grid = grid;
    }
}