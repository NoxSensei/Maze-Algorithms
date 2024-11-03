import {Direction} from "@/_common/models/direction";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";

export abstract class MazeAlgorithm {
    protected directions = Object.values(Direction) as Direction[];

    public buildPath(rowsCount: number, columnsCount: number): Maze {
        const maze = new Maze(rowsCount, columnsCount);
        const visitedNodes = new Set<MazeNode>();
        this.removeWalls(maze, visitedNodes);
        maze.history = Array.from(visitedNodes);
        return maze;
    }

    protected abstract removeWalls(maze: Maze, visitedNodes: Set<MazeNode>): void;
}