import {Direction} from "@/_common/models/direction";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNodesHistory} from "@/app/algorithms/_common/models/maze-nodes-history";

export abstract class MazeAlgorithm {
    protected directions = Object.values(Direction) as Direction[];

    public buildPath(rowsCount: number, columnsCount: number): Maze {
        const maze = new Maze(rowsCount, columnsCount);
        const history = new MazeNodesHistory();
        this.removeWalls(maze, history);
        maze.history = history.toArray();
        return maze;
    }

    protected abstract removeWalls(maze: Maze, nodesHistory: MazeNodesHistory): void;
}