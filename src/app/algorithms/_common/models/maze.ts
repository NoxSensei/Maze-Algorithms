import {MazeNode} from "@/app/algorithms/_common/models/maze-node";

export class Maze {
    public grid: MazeNode[][];

    public constructor(public readonly rowsCount: number, public readonly columnsCount: number) {
        this.grid = Array.from(
            new Array(rowsCount),
            () => new Array(columnsCount)
                .fill(undefined)
                .map(() => new MazeNode())
        );
    }
}