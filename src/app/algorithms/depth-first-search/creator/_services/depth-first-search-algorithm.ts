import {JsHelpers} from "@/_common/services/js-helpers";
import {MazeAlgorithm} from "../../../_common/services/maze-algorithm";
import {Direction} from "@/_common/models/direction";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {VisitedNodesTracker} from "@/app/algorithms/depth-first-search/creator/_services/visited-nodes-tracker";

export class DepthFirstSearchAlgorithm extends MazeAlgorithm {

    public override generate(maze: Maze): Maze {
        const visited = new VisitedNodesTracker();
        const rowIndex = JsHelpers.randomInt(0, maze.rowsCount - 1);
        const columnIndex = JsHelpers.randomInt(0, maze.columnsCount - 1);

        this.backTrack(maze, visited, rowIndex, columnIndex)
        return maze;
    }

    private backTrack(maze: Maze, visited: VisitedNodesTracker, rowIndex: number, columnIndex: number): void {
        visited.markAsVisited(rowIndex, columnIndex);
        JsHelpers.shuffleArray(this.directions).forEach(direction => {
            switch (direction) {
                case Direction.North: {
                    this.backTrackNorth(maze, visited, rowIndex, columnIndex);
                    break;
                }
                case Direction.East: {
                    this.backTrackEast(maze, visited, rowIndex, columnIndex);
                    break;
                }
                case Direction.South: {
                    this.backTrackSouth(maze, visited, rowIndex, columnIndex);
                    break;
                }
                case Direction.West: {
                    this.backTrackWest(maze, visited, rowIndex, columnIndex);
                    break;
                }
            }
        })
    }

    private backTrackNorth(maze: Maze, visited: VisitedNodesTracker, rowIndex: number, columnIndex: number): void {
        const index = rowIndex - 1;
        if (index < 0) {
            return;
        }
        if (visited.isVisited(index, columnIndex)) {
            return;
        }

        maze.grid[index][columnIndex].isWallOnSouth = false;
        maze.grid[rowIndex][columnIndex].isWallOnNorth = false;
        this.backTrack(maze, visited, index, columnIndex);
    }

    private backTrackEast(maze: Maze, visited: VisitedNodesTracker, rowIndex: number, columnIndex: number): void {
        const index = columnIndex + 1;
        if (index > maze.columnsCount - 1) {
            return;
        }
        if (visited.isVisited(rowIndex, index)) {
            return;
        }
        maze.grid[rowIndex][index].isWallOnWest = false;
        maze.grid[rowIndex][columnIndex].isWallOnEast = false;
        this.backTrack(maze, visited, rowIndex, index);
    }

    private backTrackSouth(maze: Maze, visited: VisitedNodesTracker, rowIndex: number, columnIndex: number): void {
        const index = rowIndex + 1;
        if (index > maze.rowsCount - 1) {
            return;
        }
        if (visited.isVisited(index, columnIndex)) {
            return;
        }
        maze.grid[index][columnIndex].isWallOnNorth = false;
        maze.grid[rowIndex][columnIndex].isWallOnSouth = false;
        this.backTrack(maze, visited, index, columnIndex);
    }

    private backTrackWest(maze: Maze, visited: VisitedNodesTracker, rowIndex: number, columnIndex: number): void {
        const index = columnIndex - 1;
        if (index < 0) {
            return;
        }
        if (visited.isVisited(rowIndex, index)) {
            return;
        }
        maze.grid[rowIndex][index].isWallOnEast = false;
        maze.grid[rowIndex][columnIndex].isWallOnWest = false;
        this.backTrack(maze, visited, rowIndex, index);
    }
}