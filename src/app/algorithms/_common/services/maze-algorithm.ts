import {Direction} from "@/_common/models/direction";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {Maze} from "@/app/algorithms/_common/models/maze";

export abstract class MazeAlgorithm {
    protected directions = Object.values(Direction) as Direction[];

    public buildPath(rowsCount: number, columnsCount: number): Maze {
        const maze = new Maze(rowsCount, columnsCount);
        return this.generate(maze);
    }

    protected abstract generate(maze: Maze): Maze;
}