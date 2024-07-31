import {Directions} from "./directions";
import {MazeNode} from "@/app/algorithms/_services/maze-node";

export abstract class MazeAlgorithm {
    protected directions = Object.values(Directions);

    public run(rowsCount: number, columnsCount: number) {
        const grid = Array.from(new Array(rowsCount), () => new Array(columnsCount).fill(undefined).map(() => new MazeNode()));
        return this.generateMaze(grid);
    }

    protected abstract generateMaze(grid: MazeNode[][]);
}